import { describe, expect, it } from 'vitest';
import { loveNotes } from './loveNotes';
import { photos } from './photos';
import tripNone from './reveal/none';
import tripMock from './reveal/trip.mock';
import { siteConfig } from './site';
import stickers from './stickers.generated.json';
import { story } from './story';
import { tripClues } from './tripTeaser';

const photoIds = new Set(photos.map((p) => p.id));

describe('content integrity', () => {
  it('every chapter references existing photos', () => {
    for (const ch of story) for (const id of ch.photos) expect(photoIds.has(id), `${ch.id} → ${id}`).toBe(true);
  });
  it('section photos exist', () => {
    for (const id of [siteConfig.hero.photo, siteConfig.loveNotes.photo, siteConfig.closing.photo]) expect(photoIds.has(id)).toBe(true);
  });
  it('ids are unique', () => {
    expect(new Set(photos.map((p) => p.id)).size).toBe(photos.length);
    expect(new Set(story.map((c) => c.id)).size).toBe(story.length);
    expect(new Set(loveNotes.map((n) => n.id)).size).toBe(loveNotes.length);
  });
  it('every mascot pose has a sticker', () => {
    for (const ch of story) if (ch.mascot) expect(Object.keys(stickers)).toContain(`mascot/kt-${ch.mascot}`);
  });
  it('clue unlock dates are valid ISO dates', () => {
    for (const c of tripClues) if (c.unlockDate) expect(c.unlockDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
  it('never includes the birth year', () => {
    expect(JSON.stringify(siteConfig)).not.toMatch(/2001/);
  });
});

describe('reveal content separation', () => {
  it('the teaser stub contains no trip', () => {
    expect(tripNone).toBeNull();
  });
  it('the mock trip is obviously fake', () => {
    expect(tripMock.destination.name).toBe('THE MOON');
    expect(tripMock.days.length).toBeGreaterThan(0);
  });
});
