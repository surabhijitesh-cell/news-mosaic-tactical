'use client';

import React, { useEffect, useState } from 'react';

export const StreamPlayer = ({ videoId, muted = true }: any) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return <div className="w-full h-full bg-black animate-pulse" />;

  if (videoId) {
    // 🛡️ THE STEALTH DOMAIN: Using youtube-nocookie to bypass regional tracking blocks
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&modestbranding=1&controls=0&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`;
    
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
