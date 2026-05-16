'use client';

import React, { useEffect, useState } from 'react';

export const StreamPlayer = ({ videoId, hlsUrl, muted = true }: any) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return <div className="w-full h-full bg-black animate-pulse" />;

  // 🛰️ STEALTH SIGNAL INTERCEPT (Raw HLS)
  if (hlsUrl) {
    return (
      <video 
        autoPlay 
        muted={muted} 
        playsInline 
        className="w-full h-full object-cover bg-black"
        src={hlsUrl}
        onError={(e) => console.log('HLS Signal Lost, switching to fallback...')}
      />
    );
  }

  // STANDARD YOUTUBE (For working signals)
  if (videoId) {
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&controls=0`;
    return <iframe src={embedUrl} className="w-full h-full border-0" allow="autoplay; fullscreen" />;
  }

  return <div className="w-full h-full bg-[#050505]" />;
};
