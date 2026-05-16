'use client';

import React, { useEffect, useRef, useState } from 'react';

export const StreamPlayer = ({ videoId, streams, muted = true }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [hlsInstance, setHlsInstance] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && streams && videoRef.current) {
      // 🛰️ DYNAMIC SATELLITE DECODER (HLS)
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
      script.onload = () => {
        const Hls = (window as any).Hls;
        if (Hls.isSupported()) {
          const hls = new Hls({
            manifestLoadingMaxRetry: 5,
            manifestLoadingRetryDelay: 1000,
          });
          const url = `https://corsproxy.io/?${encodeURIComponent(streams.primary)}`;
          hls.loadSource(url);
          hls.attachMedia(videoRef.current!);
          setHlsInstance(hls);
        } else if (videoRef.current!.canPlayType('application/vnd.apple.mpegurl')) {
          videoRef.current!.src = streams.primary;
        }
      };
      document.head.appendChild(script);
    }
    return () => {
      if (hlsInstance) hlsInstance.destroy();
    };
  }, [isMounted, streams]);

  if (!isMounted) return <div className="w-full h-full bg-black animate-pulse" />;

  // MODE A: SATELLITE SIGNAL (Jamuna/Somoy)
  if (streams) {
    return (
      <div className="w-full h-full bg-black">
        <video 
          ref={videoRef}
          autoPlay 
          muted={muted} 
          playsInline 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // MODE B: STANDARD INTELLIGENCE (YouTube)
  if (videoId) {
    // Simplified URL to ensure maximum compatibility across all 9 slots
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&controls=0&modestbranding=1`;
    return (
      <div className="w-full h-full bg-black">
        <iframe 
          src={embedUrl} 
          className="w-full h-full border-0" 
          allow="autoplay; fullscreen; picture-in-picture" 
        />
      </div>
    );
  }

  return <div className="w-full h-full bg-[#050505]" />;
};
