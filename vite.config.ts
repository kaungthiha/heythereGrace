/// <reference types="vitest/config" />
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { siteConfig } from './src/content/site.ts';

/**
 * Which trip content gets compiled into the bundle.
 *
 *   teaser   → src/content/reveal/none.ts       (no destination, no itinerary — the safe default)
 *   mock     → src/content/reveal/trip.mock.ts  (fake "THE MOON" trip, for testing the reveal UI)
 *   revealed → src/content/reveal/trip.ts       (the REAL trip; gitignored until reveal day)
 *
 * The choice happens at BUILD time, so a teaser build never contains the real trip — not hidden,
 * not encrypted, simply absent. See docs/REVEAL_CHECKLIST.md.
 */
type RevealSource = 'teaser' | 'mock' | 'revealed';

const reveal = (file: string) => fileURLToPath(new URL(`./src/content/reveal/${file}`, import.meta.url));

function pickRevealSource(mode: string): RevealSource {
  if (mode === 'test') return 'teaser';
  if (mode === 'mock-reveal') return 'mock';
  if (mode === 'revealed') return 'revealed';
  return siteConfig.trip.revealMode === 'revealed' ? 'revealed' : 'teaser';
}

export default defineConfig(({ mode }) => {
  const source = pickRevealSource(mode);
  const files: Record<RevealSource, string> = {
    teaser: reveal('none.ts'),
    mock: reveal('trip.mock.ts'),
    revealed: reveal('trip.ts'),
  };

  if (source === 'revealed' && !existsSync(files.revealed)) {
    throw new Error(
      '\n[reveal] Revealed build requested but src/content/reveal/trip.ts does not exist.\n' +
        '         Copy src/content/reveal/trip.mock.ts to trip.ts and fill in the real trip,\n' +
        '         or set revealMode back to "teaser" in src/content/site.ts.\n',
    );
  }

  return {
    // Relative base: works at username.github.io/<any-repo-name>/ and at / without changes.
    base: './',
    plugins: [react()],
    resolve: {
      alias: { '@trip-reveal': files[source] },
    },
    define: {
      __REVEAL_SOURCE__: JSON.stringify(source),
    },
    build: {
      // No source maps in production: less accidental leakage of source/comments.
      sourcemap: false,
      assetsInlineLimit: 2048,
    },
    test: {
      environment: 'jsdom',
      include: ['src/**/*.test.{ts,tsx}'],
    },
  };
});
