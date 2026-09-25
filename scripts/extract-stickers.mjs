#!/usr/bin/env node
/**
 * Cuts the supplied sticker sheets (assets/*.png) into individual transparent WebP stickers
 * in public/assets/<group>/<name>.webp, plus their sizes in src/content/stickers.generated.json.
 * Run again if a sheet is replaced:
 *
 *   node scripts/extract-stickers.mjs            extract using the names below
 *   node scripts/extract-stickers.mjs --list     print detected stickers (row/col order) to help name a new sheet
 *
 * Each sheet's stickers are found as separate islands of opaque pixels, then read row by row,
 * left to right. Stray specks are ignored. Output never contains metadata.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const MAX = 560; // longest side of an exported sticker, px

/** Names in reading order (row by row, left to right). null = skip that sticker. */
const SHEETS = [
  {
    file: 'assets/ChatGPT Image Sep 24, 2026, 05_39_40 PM-1.png',
    group: 'mascot',
    erode: 34,
    names: ['kt-wave', 'kt-peace', 'kt-tongue', 'kt-backpack', 'kt-point-right', 'kt-point-left', 'kt-heart', 'kt-note', 'kt-secret', 'kt-booty-walk'],
  },
  {
    file: 'assets/ChatGPT Image Sep 24, 2026, 05_39_41 PM-2.png',
    group: 'birthday',
    names: ['cake', 'gift', 'envelope', 'card', 'confetti', 'popper', 'candles', 'bow', 'hearts', 'sparkles', 'flowers', 'kt-cake'],
  },
  {
    file: 'assets/ChatGPT Image Sep 24, 2026, 05_39_41 PM-3.png',
    group: 'scrapbook',
    names: [
      'tape-pink',
      'tape-blue',
      'tape-hearts',
      'tape-sage',
      'paper-blue',
      'paper-kraft',
      'polaroid-sage',
      'polaroid-pink',
      'corner-brown',
      'corner-pink',
      'corner-sage',
      'corner-blue',
      'arrow-loop',
      'arrow-red',
      'arrow-squiggle',
      'arrow-up',
      'sparkle-cluster',
      'doodle-cluster',
    ],
  },
  {
    file: 'assets/ChatGPT Image Sep 24, 2026, 05_39_42 PM-4.png',
    group: 'trip',
    names: ['suitcase', 'backpack', 'luggage-tag', 'envelope-sealed', 'map', 'compass', 'path', 'footsteps', 'cloud', 'question', 'kt-secret-closeup', 'kt-suitcase'],
  },
];

function findIslands(alpha, width, height) {
  const labels = new Int32Array(width * height);
  const islands = [];
  const stack = new Int32Array(width * height);
  let next = 0;
  for (let start = 0; start < alpha.length; start++) {
    if (!alpha[start] || labels[start]) continue;
    next++;
    let top = 0;
    stack[top++] = start;
    labels[start] = next;
    let area = 0;
    let minX = width, minY = height, maxX = 0, maxY = 0;
    while (top) {
      const p = stack[--top];
      area++;
      const x = p % width;
      const y = (p - x) / width;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const q = ny * width + nx;
          if (alpha[q] && !labels[q]) {
            labels[q] = next;
            stack[top++] = q;
          }
        }
      }
    }
    islands.push({ label: next, area, minX, minY, maxX, maxY });
  }
  return { labels, islands };
}

/** Group islands into rows by vertical overlap, then sort each row left→right. */
function readingOrder(islands) {
  const sorted = [...islands].sort((a, b) => a.minY - b.minY);
  const rows = [];
  for (const island of sorted) {
    const cy = (island.minY + island.maxY) / 2;
    const row = rows.find((r) => cy >= r.minY && cy <= r.maxY);
    if (row) {
      row.items.push(island);
      row.minY = Math.min(row.minY, island.minY);
      row.maxY = Math.max(row.maxY, island.maxY);
    } else rows.push({ minY: island.minY, maxY: island.maxY, items: [island] });
  }
  return rows.flatMap((r) => r.items.sort((a, b) => a.minX - b.minX));
}

const listOnly = process.argv.includes('--list');
const dims = {};

for (const sheet of SHEETS) {
  const { data, info } = await sharp(join(root, sheet.file)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const alpha = new Uint8Array(width * height);
  for (let i = 0; i < alpha.length; i++) alpha[i] = data[i * 4 + 3] >= 128 ? 1 : 0;

  // Stickers on a sheet can touch. Erode the mask so touching stickers separate, label the
  // pieces, then grow each label back out over the original mask.
  const { labels, islands } = separate(alpha, width, height, sheet.erode ?? 7);
  const minArea = width * height * 0.004; // ignore specks
  const stickers = readingOrder(islands.filter((i) => i.area >= minArea));

  console.log(`\n${sheet.group}: ${stickers.length} stickers (expected ${sheet.names.length})`);
  if (listOnly || stickers.length !== sheet.names.length) {
    stickers.forEach((s, i) => console.log(`  #${i} ${sheet.names[i] ?? '?'}  x${s.minX}-${s.maxX} y${s.minY}-${s.maxY} area ${s.area}`));
    if (!listOnly) console.log('  ✖ count mismatch — fix the names list for this sheet.');
    continue;
  }

  mkdirSync(join(root, 'public/assets', sheet.group), { recursive: true });
  for (const [i, s] of stickers.entries()) {
    const name = sheet.names[i];
    if (!name) continue;
    const pad = 3;
    const x0 = Math.max(0, s.minX - pad);
    const y0 = Math.max(0, s.minY - pad);
    const w = Math.min(width, s.maxX + pad + 1) - x0;
    const h = Math.min(height, s.maxY + pad + 1) - y0;
    // Copy only this island's pixels so neighbouring specks don't come along.
    const out = Buffer.alloc(w * h * 4);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const src = (y0 + y) * width + (x0 + x);
        const dst = (y * w + x) * 4;
        // Keep the island plus its soft anti-aliased fringe (low-alpha pixels touching it).
        const inIsland = labels[src] === s.label;
        const fringe = !inIsland && data[src * 4 + 3] > 0 && data[src * 4 + 3] < 128 && nearLabel(labels, width, height, x0 + x, y0 + y, s.label);
        if (inIsland || fringe) data.copy(out, dst, src * 4, src * 4 + 4);
      }
    }
    const file = join(root, 'public/assets', sheet.group, `${name}.webp`);
    const img = sharp(out, { raw: { width: w, height: h, channels: 4 } }).resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true });
    const meta = await img.webp({ quality: 86, alphaQuality: 90, effort: 5 }).toFile(file);
    dims[`${sheet.group}/${name}`] = [meta.width, meta.height];
    console.log(`  ✓ ${sheet.group}/${name}.webp  ${meta.width}×${meta.height}  ${(meta.size / 1024).toFixed(0)} KB`);
  }
}

if (!listOnly) {
  const sorted = Object.fromEntries(Object.entries(dims).sort());
  writeFileSync(join(root, 'src/content/stickers.generated.json'), JSON.stringify(sorted, null, 1) + '\n');
  console.log(`\nWrote src/content/stickers.generated.json (${Object.keys(sorted).length} stickers)`);
}

function separate(mask, width, height, radius) {
  let eroded = mask;
  for (let r = 0; r < radius; r++) {
    const next = new Uint8Array(eroded.length);
    for (let y = 1; y < height - 1; y++)
      for (let x = 1; x < width - 1; x++) {
        const i = y * width + x;
        next[i] = eroded[i] && eroded[i - 1] && eroded[i + 1] && eroded[i - width] && eroded[i + width] ? 1 : 0;
      }
    eroded = next;
  }
  const { labels } = findIslands(eroded, width, height);
  // Multi-source BFS: grow labels back into the original mask.
  let frontier = [];
  for (let i = 0; i < labels.length; i++) if (labels[i]) frontier.push(i);
  while (frontier.length) {
    const nextFrontier = [];
    for (const p of frontier) {
      const x = p % width;
      for (const q of [p - 1, p + 1, p - width, p + width]) {
        if (q < 0 || q >= labels.length || (q === p - 1 && x === 0) || (q === p + 1 && x === width - 1)) continue;
        if (mask[q] && !labels[q]) {
          labels[q] = labels[p];
          nextFrontier.push(q);
        }
      }
    }
    frontier = nextFrontier;
  }
  const byLabel = new Map();
  for (let i = 0; i < labels.length; i++) {
    const l = labels[i];
    if (!l) continue;
    const x = i % width;
    const y = (i - x) / width;
    const b = byLabel.get(l) ?? { label: l, area: 0, minX: width, minY: height, maxX: 0, maxY: 0 };
    b.area++;
    if (x < b.minX) b.minX = x;
    if (x > b.maxX) b.maxX = x;
    if (y < b.minY) b.minY = y;
    if (y > b.maxY) b.maxY = y;
    byLabel.set(l, b);
  }
  return { labels, islands: [...byLabel.values()] };
}

function nearLabel(labels, width, height, x, y, label) {
  for (let dy = -2; dy <= 2; dy++)
    for (let dx = -2; dx <= 2; dx++) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < width && ny < height && labels[ny * width + nx] === label) return true;
    }
  return false;
}
