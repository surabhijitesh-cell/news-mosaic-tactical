'use client';

import React, { useEffect, useState } from 'react';

interface StreamPlayerProps {
  videoId?: string;
  webUrl?: string; // New: Direct website bypass
  muted?: boolean;
}

export const StreamPlayer: React.FC<StreamPlayerProps> = ({ videoId, webUrl, muted = true }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return <div className="w-full h-full bg-black animate-pulse" />;

  // Priority 1: Direct Web Bypass (For blocked YouTube signals)
  if (webUrl) {
    return (
      <div className="w-full h-full bg-black relative overflow-hidden">
        <iframe 
          src={webUrl} 
          className="absolute border-0" 
          style={{
            width: '200%', // Zoomed in to hide website clutter
            height: '200%',
            top: '-50%',
            left: '-50%',
          }}
          allow="autoplay; fullscreen"
        />
        {/* Stealth Overlay to prevent clicks from leaving the page */}
        <div className="absolute inset-0 z-10 bg-transparent" />
      </div>
    );
  }

  // Priority 2: Standard YouTube
  if (videoId) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&controls=0`;
    return (
      <iframe src={embedUrl} className="w-full h-full border-0" allow="autoplay; fullscreen" />
    );
  }

  return <div className="w-full h-full bg-black" />;
};
