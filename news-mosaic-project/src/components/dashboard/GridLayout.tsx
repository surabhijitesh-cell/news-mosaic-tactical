'use client';

import React from 'react';
import { VideoTile } from './VideoTile';
import { channels } from '@/data/channels';
import { useStreamStore } from '@/store/useStreamStore';
import { motion, AnimatePresence } from 'framer-motion';

export const GridLayout: React.FC = () => {
  const { focusedId } = useStreamStore();

  // Organize channels to fit the 3x3 tactical grid
  // Hierarchy:
  // Row 1: English, English, English
  // Row 2: English, FEATURED LOCAL, English
  // Row 3: Local, Local, Local
  
  const english = channels.filter(c => c.category === 'english');
  const local = channels.filter(c => c.category === 'local');

  const gridMap = [
    english[0], english[1], english[2],
    english[3], local[0], english[4], // Middle is local[0] (Featured)
    local[1], local[2], local[3]
  ];

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <div className="news-grid">
        {gridMap.map((channel, index) => (
          <VideoTile 
            key={channel.id} 
            channel={channel} 
            isFeatured={index === 4} // Middle tile
          />
        ))}
      </div>
      
      {/* Keyboard Help Overlay (Subtle) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 text-[10px] font-mono text-white/20 pointer-events-none uppercase tracking-widest">
        <span>[F] Fullscreen</span>
        <span>[M] Mute All</span>
        <span>[ESC] Back</span>
        <span>[1-9] Select</span>
      </div>
    </div>
  );
};
