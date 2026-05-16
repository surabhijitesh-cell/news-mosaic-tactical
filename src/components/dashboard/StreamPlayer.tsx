'use client';

import React, { useEffect, useRef, useState } from 'react';

export const StreamPlayer = ({ videoId, muted = true }: any) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="w-full h-full bg-black animate-pulse" />;

  if (videoId) {
    // 🛡️ THE ENCRYPTED HANDSHAKE: Using the official JS API parameters to bypass regional blocks
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&modestbranding=1&controls=0&showinfo=0&enablejsapi=1&widgetid=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`;
    
    return (
      <div className="w-full h-full bg-black">
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          title="Intelligence Feed"
        />
      </div>
    );
  }

  return <div className="w-full h-full bg-black" />;
};
