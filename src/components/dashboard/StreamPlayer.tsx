'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface StreamConfig {
  primary: string;
  backups: string[];
}

interface StreamPlayerProps {
  videoId?: string;
  channelId?: string;
  dmId?: string;
  webUrl?: string;
  hlsUrl?: string;
  streams?: StreamConfig;
  muted?: boolean;
  playing?: boolean;
}

export const StreamPlayer: React.FC<StreamPlayerProps> = ({ 
  videoId, 
  channelId,
  dmId,
  webUrl,
  hlsUrl,
  streams,
  muted = true,
  playing = true
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamIndex, setStreamIndex] = useState(-1);
  const hlsRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getActiveUrl = () => {
    if (!streams) return null;
    return streamIndex === -1 ? streams.primary : streams.backups[streamIndex];
  };

  useEffect(() => {
    if (isMounted && streams && videoRef.current) {
      
      const initializeHls = () => {
        const Hls = (window as any).Hls;
        if (Hls && Hls.isSupported()) {
          if (hlsRef.current) {
            hlsRef.current.destroy();
          }

          const hls = new Hls({
            maxMaxBufferLength: 30,
            maxBufferLength: 10,
            liveSyncDuration: 3,
            liveMaxLatencyDuration: 10,
            manifestLoadingMaxRetry: 3,
            manifestLoadingRetryDelay: 1000,
          });
          
          hlsRef.current = hls;

          const url = getActiveUrl();
          if (url) {
            hls.loadSource(url);
            hls.attachMedia(videoRef.current!);
          }

          hls.on(Hls.Events.ERROR, (event: any, data: any) => {
            if (data.fatal) {
              console.warn("Signal interference. Attempting failover...");
              if (streamIndex < streams.backups.length - 1) {
                setStreamIndex(prev => prev + 1);
              }
            }
          });
        } else if (videoRef.current && videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
          const url = getActiveUrl();
          if (url) {
             videoRef.current.src = url;
          }
        }
      };

      if (!(window as any).Hls) {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/hls.js@1.5.7/dist/hls.light.min.js";
        script.async = true;
        script.onload = initializeHls;
        document.head.appendChild(script);
      } else {
        initializeHls();
      }

      return () => {
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
      };
    }
  }, [isMounted, streams, streamIndex]);

  if (!isMounted) {
    return <div className="w-full h-full bg-black animate-pulse" />;
  }

  // 1. DYNAMIC SATELLITE DECODER (HLS) with Failover
  if (streams) {
    return (
      <div className="w-full h-full bg-black relative">
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

  // Helper to extract YouTube ID if a full URL was provided
  const getYouTubeId = (id: string) => {
    if (id.includes('youtube.com/watch?v=')) {
      return id.split('v=')[1]?.split('&')[0];
    }
    if (id.includes('youtu.be/')) {
      return id.split('youtu.be/')[1]?.split('?')[0];
    }
    return id;
  };

  // Priority 1: YouTube Embed (Supports remote muting)
  if (videoId) {
    const cleanId = getYouTubeId(videoId);
    const embedUrl = `https://www.youtube.com/embed/${cleanId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&modestbranding=1&controls=0&showinfo=0&enablejsapi=1`;
    
    return (
      <div className="w-full h-full bg-black relative">
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          title="YouTube Source"
        />
      </div>
    );
  }

  // Priority 2: Direct Tactical Web Zoom (Legacy Fallback)
  if (webUrl) {
    return (
      <div className="w-full h-full bg-black relative overflow-hidden">
        <iframe
          src={webUrl}
          className="absolute border-0"
          style={{
            width: '240%',
            height: '240%',
            top: '-65%',
            left: '-70%',
            transform: 'scale(1)',
          }}
          allow="autoplay; encrypted-media; fullscreen"
          title="Direct Source"
        />
        <div className="absolute inset-0 z-10 pointer-events-none" />
      </div>
    );
  }

  // Priority 3: Dailymotion Embed
  if (dmId) {
    const embedUrl = `https://www.dailymotion.com/embed/video/${dmId}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&ui-start-screen-info=0`;
    
    return (
      <div className="w-full h-full bg-black relative">
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          allow="autoplay; encrypted-media; fullscreen"
          title="Dailymotion Source"
        />
        <div className="absolute inset-0 z-10" />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#080808] flex items-center justify-center border border-white/5">
       <div className="flex flex-col items-center gap-2">
         <div className="w-4 h-4 border border-white/20 rounded-full animate-ping" />
         <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">Searching for Signal...</span>
       </div>
    </div>
  );
};
