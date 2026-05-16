'use client';

import React, { useEffect, useRef, useState } from 'react';

export const StreamPlayer = ({ videoId, hlsUrl, muted = true }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (hlsUrl && videoRef.current) {
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
      script.onload = () => {
        const Hls = (window as any).Hls;
        if (Hls.isSupported()) {
          const hls = new Hls();
          // 🛡️ THE PROXY BYPASS: Encapsulating the URL to bypass server blocks
          const proxiedUrl = `https://corsproxy.io/?${encodeURIComponent(hlsUrl)}`;
          hls.loadSource(proxiedUrl);
          hls.attachMedia(videoRef.current!);
        }
      };
      document.head.appendChild(script);
    }
  }, [hlsUrl]);

  if (!isMounted) return <div className="w-full h-full bg-black animate-pulse" />;

  if (hlsUrl) {
    return <video ref={videoRef} autoPlay muted={muted} playsInline className="w-full h-full object-cover bg-black" />;
  }

  if (videoId) {
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&controls=0&enablejsapi=1`;
    return <iframe src={embedUrl} className="w-full h-full border-0" allow="autoplay; fullscreen" />;
  }

  return <div className="w-full h-full bg-black" />;
};
