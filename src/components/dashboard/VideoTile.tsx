'use client';

import React, { useState } from 'react';
import { StreamPlayer } from './StreamPlayer';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Volume2, AlertCircle } from 'lucide-react';
import { useStreamStore } from '@/store/useStreamStore';
import { Channel } from '@/data/channels';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface VideoTileProps {
  channel: Channel;
  isFeatured?: boolean;
}

export const VideoTile: React.FC<VideoTileProps> = ({ channel, isFeatured }) => {
  const { 
    focusedId, 
    setFocusedId, 
    activeAudioId, 
    setActiveAudioId, 
    isMutedAll 
  } = useStreamStore();

  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  const isActiveAudio = activeAudioId === channel.id;
  const isMuted = !isActiveAudio && !(isHovered && !activeAudioId);

  // Keep tiles in DOM to prevent hydration issues
  const isHiddenByFocus = focusedId !== null && focusedId !== channel.id;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setActiveAudioId(channel.id)}
      className={cn(
        "video-tile group cursor-pointer h-full w-full",
        isFeatured && "ring-2 ring-accent/30",
        isActiveAudio && "active-audio",
        isHovered && !isActiveAudio && "border-white/20",
        isHiddenByFocus && "opacity-20 scale-95 grayscale pointer-events-none"
      )}
    >
      {/* Tactical Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-2 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-1">
          <div className="live-indicator">
            <span /> LIVE
          </div>
          <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-white/70 uppercase tracking-tighter border border-white/10">
            {channel.name}
          </div>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setFocusedId(channel.id);
          }}
          className="p-1.5 bg-black/40 hover:bg-accent/80 text-white rounded transition-colors pointer-events-auto opacity-0 group-hover:opacity-100"
        >
          <Maximize2 size={14} />
        </button>
      </div>

      {/* Video Container */}
      <div className="relative w-full h-full bg-black aspect-video flex items-center justify-center">
        {!hasError ? (
          <StreamPlayer
            videoId={channel.videoId}
            channelId={channel.channelId}
            dmId={channel.dmId}
            webUrl={channel.webUrl}
            hlsUrl={channel.hlsUrl}
            streams={channel.streams}
            playing={true}
            muted={isMuted || isMutedAll}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-white/40">
            <AlertCircle size={32} />
            <span className="text-xs font-mono uppercase">Stream Offline</span>
          </div>
        )}

        {/* Buffering Overlay */}
        {isBuffering && !hasError && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Audio Status Icon */}
      <div className="absolute bottom-2 right-2 z-10">
        <AnimatePresence>
          {isActiveAudio && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="p-1 bg-accent text-white rounded shadow-lg"
            >
              <Volume2 size={12} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Hover Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};
