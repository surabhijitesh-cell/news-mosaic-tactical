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

          // STEP 1: Try Direct Connection (Highest Quality/No Delay)
          hls.loadSource(streams.primary);
          hls.attachMedia(videoRef.current!);
          
          hls.on(Hls.Events.ERROR, (event: any, data: any) => {
            if (data.fatal) {
              console.warn("Direct signal blocked. Initiating Proxy Bypass...");
              // STEP 2: Fallback to CORS Proxy
              const proxiedUrl = `https://corsproxy.io/?${encodeURIComponent(streams.primary)}`;
              hls.loadSource(proxiedUrl);
            }
          });

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
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&controls=0&modestbranding=1`;
    return (
      <div className="w-full h-full bg-black">
        <iframe 
          src={embedUrl} 
          className="w-full h-full border-0" 
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture" 
        />
      </div>
    );
  }

  return <div className="w-full h-full bg-black" />;
};
