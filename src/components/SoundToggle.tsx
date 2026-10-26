import { useSyncExternalStore } from 'react';
import { siteConfig } from '../content/site';
import { isSoundtrackPlaying, subscribeSoundtrack, toggleSoundtrack } from '../utils/soundtrack';

/** Soundtrack button. Only rendered when siteConfig.soundtrack is set. Playback lives in utils/soundtrack. */
export function SoundToggle() {
  const track = siteConfig.soundtrack;
  const playing = useSyncExternalStore(subscribeSoundtrack, isSoundtrackPlaying, () => false);
  if (!track) return null;

  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={() => void toggleSoundtrack()}
      aria-pressed={playing}
      aria-label={`Music: ${track.label}`}
      title={`${playing ? 'Pause' : 'Play'} music: ${track.label} (see CREDITS.md)`}
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
  );
}
