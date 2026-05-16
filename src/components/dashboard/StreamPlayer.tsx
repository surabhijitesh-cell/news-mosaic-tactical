'use client';

import React, { useEffect, useState } from 'react';

export const StreamPlayer = ({ videoId, muted = true }: any) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return <div className="w-full h-full bg-black animate-pulse" />;

  if (videoId) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&modestbranding=1&controls=0&enablejsapi=1`;
    
    return (
      <iframe
        src={embedUrl}
        className="w-full h-full border-0"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      />
    );
  }

  return <div className="w-full h-full bg-black" />;
};
