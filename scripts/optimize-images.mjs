#!/usr/bin/env node
/**
 * Photo + video pipeline. Never modifies originals.
 *
 *   photos-original/**            → public/images/<name>-<width>.{avif,webp}  + src/content/photos.generated.json
 *   photos-original/**.{mp4,mov}  → public/videos/<name>.mp4 + a poster image under the same <name>
 *   photos-original/reveal/**     → src/content/reveal/assets/<name>.webp      (reveal-only; gitignored)
 *
 * - auto-rotates using EXIF orientation, then strips ALL metadata (GPS, camera, dates)
 * - makes 480 / 960 / 1600px widths (never upscales)
 * - videos: 720p H.264/AAC MP4 at 30fps with all metadata (incl. GPS location) removed; plays in every browser
 * - records each photo's size + average color so the page reserves space while loading
 * - skips photos that are already up to date (use --force to redo everything)
 *
 *   npm run optimize-images
 *   npm run optimize-images -- --force
 *   npm run optimize-images -- --clean     also delete optimized files whose original is gone
 */
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, extname, join, relative } from 'node:path';
import { promisify } from 'node:util';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

const run = promisify(execFile);
const root = fileURLToPath(new URL('..', import.meta.url));
const SRC = join(root, 'photos-original');
const OUT = join(root, 'public/images');
const VIDEO_OUT = join(root, 'public/videos');
const REVEAL_SRC = join(SRC, 'reveal');
const REVEAL_OUT = join(root, 'src/content/reveal/assets');
const MANIFEST = join(root, 'src/content/photos.generated.json');

const WIDTHS = [480, 960, 1600];
const FORMATS = { avif: { quality: 52, effort: 4 }, webp: { quality: 78 } };
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff', '.heic', '.heif']);
const VIDEO_EXTS = new Set(['.mp4', '.mov', '.m4v']);

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
    const ext = extname(name).toLowerCase();
    return statSync(p).isDirectory() ? walk(p) : EXTS.has(ext) || VIDEO_EXTS.has(ext) ? [p] : [];
  });

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'photo';

const isVideo = (f) => VIDEO_EXTS.has(extname(f).toLowerCase());
const hex = (n) => Math.round(n).toString(16).padStart(2, '0');

const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
const nextManifest = {};
const used = new Set();
let made = 0;
let skipped = 0;
const problems = [];

const all = walk(SRC);
const regular = all.filter((f) => !f.startsWith(REVEAL_SRC));
const reveal = all.filter((f) => f.startsWith(REVEAL_SRC) && !isVideo(f));
all.filter((f) => f.startsWith(REVEAL_SRC) && isVideo(f)).forEach((f) => problems.push(`${relative(root, f)}: videos aren't supported in reveal/ yet.`));

/** Web-sized AVIF/WebP copies of one image (a path or a buffer); returns its manifest entry. */
async function optimizeImage(input, name) {
  // rotate() applies EXIF orientation; sharp drops all metadata on output unless asked to keep it.
  const { data, info } = await sharp(input, { failOn: 'none' }).rotate().toBuffer({ resolveWithObject: true });
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
  return {
    w: info.width,
    h: info.height,
    widths: uniqueWidths,
    formats: Object.keys(FORMATS),
    color: `#${hex(dominant.r)}${hex(dominant.g)}${hex(dominant.b)}`,
  };
}

/** Transcodes one video to public/videos/<name>.mp4 and returns a PNG frame from its start (the poster). */
async function transcodeVideo(file, name) {
  mkdirSync(VIDEO_OUT, { recursive: true });
  const out = join(VIDEO_OUT, `${name}.mp4`);
  // Phones record HDR (HLG/PQ); browsers show 8-bit HDR tags inconsistently, so tone-map to plain SDR.
  const probe = await run(ffmpegPath, ['-hide_banner', '-i', file]).catch((err) => err);
  const hdr = /arib-std-b67|smpte2084/.test(probe.stderr ?? '');
  const toSdr = hdr ? 'zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,' : '';
  // Short side <=720px. -map_metadata -1 (global + per-stream) drops GPS location, dates and device tags.
  await run(ffmpegPath, [
    '-y', '-v', 'error', '-i', file,
    '-map', '0:v:0', '-map', '0:a:0?',
    '-map_metadata', '-1', '-map_metadata:s:v', '-1', '-map_metadata:s:a', '-1', '-map_chapters', '-1',
    '-vf', `${toSdr}scale='if(gt(iw,ih),-2,min(720,iw))':'if(gt(iw,ih),min(720,ih),-2)',fps=30,format=yuv420p`,
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-profile:v', 'high',
    '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', '-fflags', '+bitexact',
    out,
  ]);
  const { stdout } = await run(ffmpegPath, ['-v', 'error', '-ss', '0.4', '-i', out, '-frames:v', '1', '-f', 'image2pipe', '-c:v', 'png', '-'], {
    encoding: 'buffer',
    maxBuffer: 64 * 1024 * 1024,
  });
  return stdout;
}

for (const file of regular) {
  let name = slugify(basename(file, extname(file)));
  if (secretTerms.some((t) => name.includes(t.replace(/\s+/g, '-')))) {
    problems.push(`${relative(root, file)}: filename contains a secret term — rename the original first.`);
    continue;
  }
  for (let n = 2; used.has(name); n++) name = `${name.replace(/-\d+$/, '')}-${n}`;
  used.add(name);

  const srcTime = statSync(file).mtimeMs;
  const video = isVideo(file);
  const fresh = (p) => existsSync(p) && statSync(p).mtimeMs >= srcTime;
  const prev = manifest[name];
  const upToDate =
    !force &&
    prev &&
    Boolean(prev.video) === video &&
    (!video || fresh(join(VIDEO_OUT, prev.video))) &&
    prev.widths.every((w) => prev.formats.every((f) => fresh(join(OUT, `${name}-${w}.${f}`))));
  if (upToDate) {
    nextManifest[name] = prev;
    skipped++;
    continue;
  }

  try {
    const entry = video
      ? { ...(await optimizeImage(await transcodeVideo(file, name), name)), video: `${name}.mp4` }
      : await optimizeImage(file, name);
    nextManifest[name] = entry;
    made++;
    console.log(`  ✓ ${relative(root, file)}  →  "${name}"  (${entry.w}×${entry.h}${video ? ', video' : ''})`);
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
  const keepVideos = new Set(Object.values(nextManifest).map((e) => e.video).filter(Boolean));
  for (const f of existsSync(VIDEO_OUT) ? readdirSync(VIDEO_OUT) : []) {
    if (f.endsWith('.mp4') && !keepVideos.has(f)) {
      rmSync(join(VIDEO_OUT, f));
      console.log(`  🗑  removed videos/${f}`);
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
