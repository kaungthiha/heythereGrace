#!/usr/bin/env node
/** Lists every "[KT: …]" placeholder still in the content files.  npm run todo */
import { fileURLToPath } from 'node:url';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const dir = join(root, 'src/content');
const walk = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : /\.tsx?$/.test(n) ? [join(d, n)] : []));

let total = 0;
for (const file of walk(dir)) {
  if (file.includes('trip.mock')) continue;
  const hits = [];
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      for (const m of line.matchAll(/\[KT:[^\]]*\]/g)) hits.push(`  ${String(i + 1).padStart(4)}  ${m[0]}`);
    });
  if (hits.length) {
    console.log(`\n${relative(root, file).replaceAll('\\', '/')}  (${hits.length})`);
    console.log(hits.join('\n'));
    total += hits.length;
  }
}
console.log(total ? `\n${total} placeholders left. See CONTENT_TODO.md for the grouped checklist.\n` : '\nNo placeholders left 🎉\n');
