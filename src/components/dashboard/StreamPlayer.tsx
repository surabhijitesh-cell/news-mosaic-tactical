'use client';

import React, { useEffect, useState } from 'react';

export const StreamPlayer = ({ videoId, webUrl, muted = true }: any) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return <div className="w-full h-full bg-black animate-pulse" />;

  if (webUrl) {
    return (
      <div className="w-full h-full bg-black relative">
        <iframe 
          src={webUrl} 
          className="w-full h-full border-0" 
          allow="autoplay; fullscreen"
        />
      </div>
    );
  }

  if (videoId) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&controls=0`;
    return <iframe src={embedUrl} className="w-full h-full border-0" allow="autoplay; fullscreen" />;
  }

  return <div className="w-full h-full bg-black" />;
};
