'use client';

import React, { useEffect, useRef, useState } from 'react';

export const StreamPlayer = ({ videoId, muted = true }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!videoId) return;

    // Load the YouTube API only once
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // 🛡️ THE MULTI-HANDSHAKE ENGINE
    let player: any;
    const createPlayer = () => {
      if ((window as any).YT && (window as any).YT.Player) {
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
        });
      } else {
        // Retry if API isn't ready yet
        setTimeout(createPlayer, 100);
      }
    };

    createPlayer();

    return () => {
      if (player && typeof player.destroy === 'function') player.destroy();
    };
  }, [videoId, muted]);

  if (!isMounted) return <div className="w-full h-full bg-black animate-pulse" />;

  return (
    <div className="w-full h-full bg-black">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};
