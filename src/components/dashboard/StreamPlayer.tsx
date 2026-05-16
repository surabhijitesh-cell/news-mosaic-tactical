'use client';

import React, { useEffect, useRef, useState } from 'react';

export const StreamPlayer = ({ videoId, muted = true }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!videoId) return;

    const loadAPI = () => {
      if (!(window as any).YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    };

    const initPlayer = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        playerRef.current = new (window as any).YT.Player(containerRef.current, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            mute: muted ? 1 : 0,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (e: any) => e.target.playVideo(),
            onError: () => console.log(`Signal interference in slot: ${videoId}`)
          }
        });
      } else {
        setTimeout(initPlayer, 200);
      }
    };

    loadAPI();
    initPlayer();

    return () => {
      if (playerRef.current && playerRef.current.destroy) playerRef.current.destroy();
    };
  }, [videoId, muted]);

  if (!isMounted) return <div className="w-full h-full bg-black animate-pulse" />;

  return (
    <div className="w-full h-full bg-black">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};
