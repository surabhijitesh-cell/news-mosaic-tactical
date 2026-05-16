'use client';

import React, { useEffect, useState } from 'react';

interface StreamPlayerProps {
  videoId?: string;
  channelId?: string;
  dmId?: string;
  webUrl?: string;
  hlsUrl?: string;
  muted?: boolean;
  playing?: boolean;
}

export const StreamPlayer: React.FC<StreamPlayerProps> = ({ 
  videoId, 
  channelId,
  dmId,
  webUrl,
  hlsUrl,
  muted = true,
  playing = true
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-full bg-black animate-pulse" />;
  }

  // Priority 1: Permanent Channel ID (Most stable for Live News)
  if (channelId) {
    const embedUrl = `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&mute=${muted ? 1 : 0}&rel=0&modestbranding=1&controls=0&enablejsapi=1`;
    
    return (
      <div className="w-full h-full bg-black relative">
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          title="YouTube Live Channel"
        />
      </div>
    );
  }

  // Priority 2: Standard YouTube Video ID
  if (videoId) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&modestbranding=1&controls=0&showinfo=0&enablejsapi=1`;
    
    return (
      <div className="w-full h-full bg-black relative">
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          title="YouTube Video Source"
        />
      </div>
    );
  }

  // Fallback for empty slots
  return (
    <div className="w-full h-full bg-[#080808] flex items-center justify-center border border-white/5">
       <div className="flex flex-col items-center gap-2">
         <div className="w-4 h-4 border border-white/20 rounded-full animate-ping" />
         <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">Searching for Signal...</span>
       </div>
    </div>
  );
};
