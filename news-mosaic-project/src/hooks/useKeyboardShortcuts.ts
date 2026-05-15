'use client';

import { useEffect } from 'react';
import { useStreamStore } from '@/store/useStreamStore';
import { channels } from '@/data/channels';

export const useKeyboardShortcuts = () => {
  const { 
    setFocusedId, 
    toggleMuteAll, 
    setActiveAudioId, 
    focusedId 
  } = useStreamStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // Mute All
      if (key === 'm') {
        toggleMuteAll();
      }

      // Exit Focus
      if (key === 'escape') {
        setFocusedId(null);
      }

      // Select Stream (1-9)
      const num = parseInt(key);
      if (num >= 1 && num <= 9) {
        const channel = channels[num - 1];
        if (channel) {
          setFocusedId(channel.id);
          setActiveAudioId(channel.id);
        }
      }

      // Fullscreen Toggle (current focus)
      if (key === 'f' && !focusedId) {
        // Just focus the first one if none focused
        setFocusedId(channels[0].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setFocusedId, toggleMuteAll, setActiveAudioId, focusedId]);
};
