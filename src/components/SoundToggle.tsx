import { useRef, useState } from 'react';
import { siteConfig } from '../content/site';

/** Optional soundtrack button. Only rendered when siteConfig.soundtrack is set. Never autoplays. */
export function SoundToggle() {
  const track = siteConfig.soundtrack;
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  if (!track) return null;

  const toggle = async () => {
    const el = audio.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      return;
    }
    try {
      await el.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audio} src={`${import.meta.env.BASE_URL}${track.src}`} loop preload="none" />
      <button
        type="button"
        className="sound-toggle"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={`Music: ${track.label}`}
        style={{
          position: 'fixed',
          zIndex: 45,
          top: 'max(12px, env(safe-area-inset-top))',
          right: 'max(12px, env(safe-area-inset-right))',
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '2px solid var(--ink)',
          background: 'var(--paper)',
          boxShadow: '0 3px 0 var(--ink)',
          fontSize: 18,
        }}
      >
        <span aria-hidden="true">{playing ? '🔊' : '🔇'}</span>
      </button>
    </>
  );
}
