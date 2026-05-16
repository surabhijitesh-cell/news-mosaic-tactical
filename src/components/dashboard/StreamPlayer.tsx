'use client';

import React, { useEffect, useRef, useState } from 'react';

export const StreamPlayer = ({ videoId, muted = true }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!videoId) return;

    // 🛡️ THE MASTER HANDSHAKE: Loading the official YouTube Signature Script
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    let player: any;
    (window as any).onYouTubeIframeAPIReady = () => {
      player = new (window as any).YT.Player(containerRef.current, {
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
          onReady: (event: any) => event.target.playVideo()
        }
      });
    };

    return () => {
      if (player) player.destroy();
    };
  }, [videoId, muted]);

  if (!isMounted) return <div className="w-full h-full bg-black animate-pulse" />;

  return (
    <div className="w-full h-full bg-black">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};
