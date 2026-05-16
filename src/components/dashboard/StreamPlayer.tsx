'use client';

import React, { useEffect, useRef, useState } from 'react';

export const StreamPlayer = ({ videoId, streams, muted = true }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamIndex, setStreamIndex] = useState(-1); // -1 is primary, 0+ are backups
  const [isMounted, setIsMounted] = useState(false);

  // Get current active URL (Primary or Backup)
  const getActiveUrl = () => {
    if (!streams) return null;
    const url = streamIndex === -1 ? streams.primary : streams.backups[streamIndex];
    // Apply CORS Proxy to bypass server-side blocks
    return `https://corsproxy.io/?${encodeURIComponent(url)}`;
  };

  useEffect(() => {
    setIsMounted(true);
    if (!streams || !videoRef.current) return;

    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
    script.onload = () => {
      const Hls = (window as any).Hls;
      if (Hls.isSupported()) {
        const hls = new Hls({
          manifestLoadingRetryDelay: 1000,
          manifestLoadingMaxRetry: 3,
        });
        
        const loadSignal = () => {
          const url = getActiveUrl();
          if (url) {
            hls.loadSource(url);
            hls.attachMedia(videoRef.current!);
          }
        };

        hls.on(Hls.Events.ERROR, (event: any, data: any) => {
          if (data.fatal) {
            console.warn("Signal interference. Attempting failover...");
            if (streamIndex < (streams.backups.length - 1)) {
              setStreamIndex(prev => prev + 1);
            }
          }
        });

        loadSignal();
        return () => hls.destroy();
      }
    };
    document.head.appendChild(script);
  }, [streams, streamIndex]);

  if (!isMounted) return <div className="w-full h-full bg-black animate-pulse" />;

  // HLS Rendering Mode
  if (streams) {
    return (
      <video 
        ref={videoRef}
        autoPlay 
        muted={muted} 
        playsInline 
        className="w-full h-full object-cover bg-black"
      />
    );
  }

  // Legacy YouTube Mode
  if (videoId) {
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&controls=0&modestbranding=1&enablejsapi=1`;
    return <iframe src={embedUrl} className="w-full h-full border-0" allow="autoplay; fullscreen" />;
  }

  return <div className="w-full h-full bg-black" />;
};
