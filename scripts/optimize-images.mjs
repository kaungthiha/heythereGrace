#!/usr/bin/env node
/**
 * Photo pipeline. Never modifies originals.
 *
 *   photos-original/**            → public/images/<name>-<width>.{avif,webp}  + src/content/photos.generated.json
 *   photos-original/reveal/**     → src/content/reveal/assets/<name>.webp      (reveal-only; gitignored)
 *
 * - auto-rotates using EXIF orientation, then strips ALL metadata (GPS, camera, dates)
 * - makes 480 / 960 / 1600px widths (never upscales)
 * - records each photo's size + average color so the page reserves space while loading
 * - skips photos that are already up to date (use --force to redo everything)
 *
 *   npm run optimize-images
 *   npm run optimize-images -- --force
 *   npm run optimize-images -- --clean     also delete optimized files whose original is gone
 */
import { fileURLToPath } from 'node:url';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, extname, join, relative } from 'node:path';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const SRC = join(root, 'photos-original');
const OUT = join(root, 'public/images');
const REVEAL_SRC = join(SRC, 'reveal');
const REVEAL_OUT = join(root, 'src/content/reveal/assets');
const MANIFEST = join(root, 'src/content/photos.generated.json');

const WIDTHS = [480, 960, 1600];
const FORMATS = { avif: { quality: 52, effort: 4 }, webp: { quality: 78 } };
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff', '.heic', '.heif']);

const args = new Set(process.argv.slice(2));
const force = args.has('--force');

if (!existsSync(SRC)) {
  mkdirSync(SRC, { recursive: true });
  console.log('Created photos-original/. Drop photos in there and run this again.');
  process.exit(0);
}

const secretTerms = existsSync(join(root, '.secret-terms'))
  ? readFileSync(join(root, '.secret-terms'), 'utf8')
      .split('\n')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t && !t.startsWith('#'))
  : [];

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : EXTS.has(extname(name).toLowerCase()) ? [p] : [];
  });

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'photo';

const hex = (n) => Math.round(n).toString(16).padStart(2, '0');

const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
const nextManifest = {};
const used = new Set();
let made = 0;
let skipped = 0;
const problems = [];

const all = walk(SRC);
const regular = all.filter((f) => !f.startsWith(REVEAL_SRC));
const reveal = all.filter((f) => f.startsWith(REVEAL_SRC));

for (const file of regular) {
  let name = slugify(basename(file, extname(file)));
  if (secretTerms.some((t) => name.includes(t.replace(/\s+/g, '-')))) {
    problems.push(`${relative(root, file)}: filename contains a secret term — rename the original first.`);
    continue;
  }
  for (let n = 2; used.has(name); n++) name = `${name.replace(/-\d+$/, '')}-${n}`;
  used.add(name);

  const srcTime = statSync(file).mtimeMs;
  const prev = manifest[name];
  const upToDate =
    !force &&
    prev &&
    prev.widths.every((w) => prev.formats.every((f) => existsSync(join(OUT, `${name}-${w}.${f}`)) && statSync(join(OUT, `${name}-${w}.${f}`)).mtimeMs >= srcTime));
  if (upToDate) {
    nextManifest[name] = prev;
    skipped++;
    continue;
  }

  try {
    // rotate() applies EXIF orientation; sharp drops all metadata on output unless asked to keep it.
    const { data, info } = await sharp(file, { failOn: 'none' }).rotate().toBuffer({ resolveWithObject: true });
    const widths = WIDTHS.filter((w) => w < info.width);
    if (widths.length < WIDTHS.length) widths.push(Math.min(info.width, WIDTHS[WIDTHS.length - 1]));
    const uniqueWidths = [...new Set(widths)].sort((a, b) => a - b);

    mkdirSync(OUT, { recursive: true });
    for (const w of uniqueWidths) {
      for (const [format, options] of Object.entries(FORMATS)) {
        await sharp(data).resize({ width: w, withoutEnlargement: true }).toFormat(format, options).toFile(join(OUT, `${name}-${w}.${format}`));
      }
    }
    const { dominant } = await sharp(data).resize(32).stats();
    nextManifest[name] = {
      w: info.width,
      h: info.height,
      widths: uniqueWidths,
      formats: Object.keys(FORMATS),
      color: `#${hex(dominant.r)}${hex(dominant.g)}${hex(dominant.b)}`,
    };
    made++;
    console.log(`  ✓ ${relative(root, file)}  →  "${name}"  (${info.width}×${info.height})`);
  } catch (err) {
    const heic = /\.hei[cf]$/i.test(file);
    problems.push(`${relative(root, file)}: ${heic ? 'HEIC not supported by this sharp build — export it as JPEG first.' : err.message}`);
  }
}

// Reveal-only images: one web-sized WebP each, into the gitignored reveal assets folder.
for (const file of reveal) {
  const name = slugify(basename(file, extname(file)));
  const out = join(REVEAL_OUT, `${name}.webp`);
  if (!force && existsSync(out) && statSync(out).mtimeMs >= statSync(file).mtimeMs) continue;
  mkdirSync(REVEAL_OUT, { recursive: true });
  const info = await sharp(file, { failOn: 'none' }).rotate().resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
  console.log(`  ✓ [reveal] ${relative(root, file)} → src/content/reveal/assets/${name}.webp (${info.width}×${info.height})`);
  console.log(`      import img from './assets/${name}.webp';  →  image: { src: img, alt: '…', width: ${info.width}, height: ${info.height} }`);
}

writeFileSync(MANIFEST, JSON.stringify(Object.fromEntries(Object.entries(nextManifest).sort()), null, 2) + '\n');

if (args.has('--clean') && existsSync(OUT)) {
  const keep = new Set(Object.entries(nextManifest).flatMap(([n, e]) => e.widths.flatMap((w) => e.formats.map((f) => `${n}-${w}.${f}`))));
  for (const f of readdirSync(OUT)) {
    if (/\.(avif|webp)$/.test(f) && !keep.has(f)) {
      rmSync(join(OUT, f));
      console.log(`  🗑  removed ${f}`);
    }
  }
}

console.log(`\nDone: ${made} optimized, ${skipped} already up to date, ${Object.keys(nextManifest).length} photos in the manifest.`);
if (made) console.log('Use the names in quotes above as `src` in src/content/photos.ts.');
if (problems.length) {
  console.log('\nProblems:');
  problems.forEach((p) => console.log(`  ✖ ${p}`));
  process.exitCode = 1;
}
