import { siteConfig } from '../content/site';
import { readJSON, STORAGE_KEYS, writeJSON } from './storage';

/**
 * The site-wide soundtrack: one looping <audio>, shared by the 🔊/🔇 button.
 *
 * Browsers only allow sound after the visitor interacts, so it starts on her first tap/click/keypress
 * (opening the present counts) unless she muted it on an earlier visit. It pauses while one of the
 * story videos plays, then picks up again.
 */
let audio: HTMLAudioElement | null = null;
let playing = false;
let pausedForVideo = false;
const listeners = new Set<() => void>();

const setPlaying = (value: boolean) => {
  playing = value;
  listeners.forEach((fn) => fn());
};

function getAudio(): HTMLAudioElement | null {
  const track = siteConfig.soundtrack;
  if (!track || typeof Audio === 'undefined') return null;
  if (!audio) {
    audio = new Audio(`${import.meta.env.BASE_URL}${track.src}`);
    audio.loop = true;
    audio.preload = 'none';
    audio.addEventListener('play', () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));
  }
  return audio;
}

export const isSoundtrackPlaying = () => playing;

export function subscribeSoundtrack(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

async function play(): Promise<boolean> {
  const el = getAudio();
  if (!el) return false;
  try {
    await el.play();
    return true;
  } catch {
    return false; // not allowed yet (no interaction) or the file failed — the button still works
  }
}

/** The 🔊/🔇 button. Remembers a mute so later visits stay quiet. */
export async function toggleSoundtrack() {
  pausedForVideo = false;
  if (playing) {
    getAudio()?.pause();
    writeJSON(STORAGE_KEYS.soundMuted, true);
  } else if (await play()) {
    writeJSON(STORAGE_KEYS.soundMuted, false);
  }
}

/** Call once on load: start on the first interaction, and step aside for videos. */
export function setUpSoundtrack(): () => void {
  if (!siteConfig.soundtrack) return () => {};

  const events = ['pointerup', 'keydown', 'touchend'] as const;
  const startOnInteraction = async (e: Event) => {
    // A tap on the sound button handles itself; anything else may start the music.
    if ((e.target as Element | null)?.closest?.('.sound-toggle')) return stopListening();
    if (readJSON(STORAGE_KEYS.soundMuted, false)) return stopListening();
    if (await play()) stopListening();
  };
  const stopListening = () => events.forEach((t) => window.removeEventListener(t, startOnInteraction, true));
  events.forEach((t) => window.addEventListener(t, startOnInteraction, true));

  const onVideoPlay = (e: Event) => {
    if (!(e.target instanceof HTMLVideoElement) || !playing) return;
    pausedForVideo = true;
    getAudio()?.pause();
  };
  const onVideoStop = (e: Event) => {
    if (!(e.target instanceof HTMLVideoElement) || !pausedForVideo) return;
    pausedForVideo = false;
    void play();
  };
  // Media events don't bubble, so listen in the capture phase.
  document.addEventListener('play', onVideoPlay, true);
  document.addEventListener('pause', onVideoStop, true);
  document.addEventListener('ended', onVideoStop, true);

  return () => {
    stopListening();
    document.removeEventListener('play', onVideoPlay, true);
    document.removeEventListener('pause', onVideoStop, true);
    document.removeEventListener('ended', onVideoStop, true);
  };
}
