#!/usr/bin/env node
/**
 * Surprise protection. Builds the site and proves the destination isn't in anything public.
 *
 *   npm run check:secrets              build, then scan dist/ + every file git would publish + git history
 *   npm run check:secrets -- --no-build   scan the existing dist/ without rebuilding
 *
 * Secret terms come from `.secret-terms` (gitignored, one per line) or the SECRET_TERMS
 * environment variable (newline- or comma-separated, e.g. a GitHub Actions secret).
 * Terms are never printed — matches are reported as "term #2 (P…)".
 */
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const args = new Set(process.argv.slice(2));
const failures = [];
const warn = (msg) => console.log(`  ! ${msg}`);

// ---------------------------------------------------------------- terms
function loadTerms() {
  const raw = [process.env.SECRET_TERMS ?? ''];
  const file = join(root, '.secret-terms');
  if (existsSync(file)) raw.push(readFileSync(file, 'utf8'));
  return [
    ...new Set(
      raw
        .join('\n')
        .split(/[\n,]/)
        .map((t) => t.trim())
        .filter((t) => t && !t.startsWith('#')),
    ),
  ];
}
const terms = loadTerms();
if (terms.length === 0) {
  console.error(
    '\n✖ No secret terms configured.\n' +
      '  Create a file called .secret-terms in the project root (it is gitignored) with one\n' +
      '  destination word per line, or set the SECRET_TERMS environment variable.\n',
  );
  process.exit(1);
}
const label = (i) => `term #${i + 1} (${terms[i][0]}…)`;
const lowerTerms = terms.map((t) => t.toLowerCase());

function findTerms(text) {
  const lower = text.toLowerCase();
  return lowerTerms.flatMap((t, i) => (lower.includes(t) ? [i] : []));
}

// ---------------------------------------------------------------- reveal mode
const siteSrc = readFileSync(join(root, 'src/content/site.ts'), 'utf8');
const revealed = /revealMode:\s*['"]revealed['"]/.test(siteSrc);
console.log(`\nSurprise check — ${terms.length} secret term(s), reveal mode: ${revealed ? 'REVEALED' : 'teaser'}\n`);

// ---------------------------------------------------------------- 1. build
if (!args.has('--no-build')) {
  console.log('1. Building the production site…');
  const r = spawnSync('npm', ['run', 'build'], { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) {
    console.error('\n✖ Build failed.');
    process.exit(1);
  }
} else {
  console.log('1. Skipping build (--no-build).');
}

// ---------------------------------------------------------------- 2. scan dist/
console.log('\n2. Scanning dist/ …');
const dist = join(root, 'dist');
if (!existsSync(dist)) {
  console.error('✖ dist/ does not exist. Run without --no-build.');
  process.exit(1);
}
const walk = (dir) => readdirSync(dir).flatMap((name) => (statSync(join(dir, name)).isDirectory() ? walk(join(dir, name)) : [join(dir, name)]));
let distFiles = 0;
for (const file of walk(dist)) {
  distFiles++;
  const rel = relative(root, file).replaceAll('\\', '/');
  if (rel.endsWith('.map')) failures.push(`${rel}: source map in the production build`);
  // Filenames count too.
  for (const i of findTerms(rel)) failures.push(`${rel}: FILENAME contains ${label(i)}`);
  // latin1 keeps every byte, so this also catches strings inside images/fonts (e.g. EXIF text).
  for (const i of findTerms(readFileSync(file).toString('latin1'))) failures.push(`${rel}: contains ${label(i)}`);
}
console.log(`   scanned ${distFiles} files`);
// Canary: text that only exists in the reveal files. Finding it in a teaser build means reveal code leaked in.
if (!revealed) {
  const canary = 'Tranquility Base';
  if (walk(dist).some((f) => readFileSync(f).toString('latin1').includes(canary)))
    failures.push('dist/: contains mock reveal data — reveal content is being bundled into the teaser build');
  if (walk(dist).some((f) => /RevealChapter|reveal__cover/.test(readFileSync(f).toString('latin1'))))
    failures.push('dist/: contains the reveal chapter code — the teaser build should not include it');
}

// ---------------------------------------------------------------- 3. files git would publish
console.log('\n3. Scanning files that would be committed/pushed …');
let gitOk = true;
try {
  const listed = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { cwd: root })
    .toString()
    .split('\0')
    .filter(Boolean);
  for (const rel of listed) {
    const abs = join(root, rel);
    if (!existsSync(abs) || statSync(abs).isDirectory()) continue;
    for (const i of findTerms(rel)) failures.push(`${rel}: FILENAME contains ${label(i)}`);
    const text = readFileSync(abs).toString('latin1');
    for (const i of findTerms(text)) {
      const line = text.toLowerCase().split('\n').findIndex((l) => l.includes(lowerTerms[i])) + 1;
      failures.push(`${rel}:${line}: contains ${label(i)}`);
    }
  }
  console.log(`   scanned ${listed.length} files`);

  if (!revealed) {
    const mustStayPrivate = ['src/content/reveal/trip.ts', 'CLAUDE.local.md', '.secret-terms', 'photos-original'];
    const tracked = execFileSync('git', ['ls-files', '--', ...mustStayPrivate], { cwd: root }).toString().trim();
    if (tracked) failures.push(`these private files are tracked by git (git rm --cached them):\n      ${tracked.split('\n').join('\n      ')}`);
  }
} catch {
  gitOk = false;
  warn('git not available — skipped repository checks');
}

// ---------------------------------------------------------------- 4. git history
if (gitOk) {
  console.log('\n4. Searching git history (all branches) …');
  terms.forEach((term, i) => {
    try {
      const hits = execFileSync('git', ['log', '--all', '--format=%h', '-i', '-G', term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')], { cwd: root })
        .toString()
        .trim();
      if (hits) failures.push(`git history: ${label(i)} appears in commit(s) ${hits.split('\n').join(', ')}`);
    } catch {
      /* empty repo */
    }
  });
}

// ---------------------------------------------------------------- report
console.log('');
if (failures.length === 0) {
  console.log('✔ No secret terms found. Safe to deploy.\n');
  process.exit(0);
}
if (revealed) {
  console.log('ℹ Reveal mode is "revealed", so the destination is EXPECTED in dist/. Matches:');
  failures.forEach((f) => console.log(`  - ${f}`));
  console.log('');
  process.exit(0);
}
console.error(`✖ ${failures.length} problem(s) — DO NOT DEPLOY:\n`);
failures.forEach((f) => console.error(`  - ${f}`));
console.error('');
process.exit(1);
