# Reveal checklist

The site has two states: **teaser**, which is what's live until the reveal, and **revealed**. Switching
means changing one setting, building and deploying. Nothing reveals itself automatically.

## Before the birthday (teaser deploy)

- [ ] `.secret-terms` exists (gitignored) with every word that would give it away: park name, state,
      nearby towns, county, lodging name, landmarks. One per line.
- [ ] `src/content/site.ts` has `revealMode: 'teaser'`.
- [ ] `npm test` passes.
- [ ] `npm run check:secrets` ends with **✔ No secret terms found. Safe to deploy.**
- [ ] `git status` does not list `src/content/reveal/trip.ts`, `CLAUDE.local.md`, `.secret-terms`
      or `photos-original/`.
- [ ] Push to `main` (the GitHub Action deploys), then open the live URL in a private window.
- [ ] On the live site, View Source and search for a secret term. Nothing should be found.

Draft the real trip any time in `src/content/reveal/trip.ts` (see CONTENT_GUIDE.md) and preview it
with `npm run dev:revealed`. It stays on your machine.

## Reveal day (October 28, before 9:00 AM)

1. [ ] **Finish the private trip content:** `src/content/reveal/trip.ts`, plus any images in
       `src/content/reveal/assets/`. Preview it with `npm run dev:revealed`.
2. [ ] **Check the destination isn't anywhere it shouldn't be:** `npm run check:secrets` while still
       in teaser mode should pass.
3. [ ] **Change reveal mode:** in `src/content/site.ts`, set `revealMode: 'revealed'`.
4. [ ] **Allow the trip files to be committed:** in `.gitignore`, delete these two lines:
       ```
       src/content/reveal/trip.ts
       src/content/reveal/assets/
       ```
       Keep `CLAUDE.local.md`, `.secret-terms` and `photos-original/` ignored.
5. [ ] **Build locally:** `npm run build`. It must succeed. If it says `trip.ts` doesn't exist, step 1
       isn't done.
6. [ ] **Check the build:** run `npm run preview`, then open the page, scroll to the end and press
       "Open it.".
7. [ ] **Confirm no source maps:** `ls dist/assets` should show no `.map` files. The build config
       turns them off.
8. [ ] **Deploy:** `git add -A && git commit -m "Reveal" && git push`. The Action publishes it in
       about a minute.
9. [ ] **Verify live:** open the production URL in a private/incognito window. The final chapter
       should say "It's time." and open to the destination. Her earlier guesses appear under "Your
       guesses, for the record" on her own phone, since they're stored in her browser.

### If something goes wrong
Set `revealMode: 'teaser'` again and push. The previous teaser comes back within a minute.

### Why the order matters
Once `trip.ts` is pushed, it is public in the repository, even if the site hasn't rebuilt yet. Do
steps 3–8 together on reveal morning, not the night before.

## Optional: automatic reveal
Not set up, on purpose. A scheduled GitHub Action could build the revealed site at 9:00 on the 28th,
but the trip content would have to live somewhere private until then (for example, a repository
secret holding the file contents), and it must never be echoed into logs. Deploying by hand with the
steps above is simpler and safer.
