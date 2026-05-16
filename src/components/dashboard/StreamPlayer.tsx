'use client';

import React, { useEffect, useState } from 'react';

interface StreamPlayerProps {
  videoId?: string;
  channelId?: string;
  dmId?: string;
  muted?: boolean;
}

export const StreamPlayer: React.FC<StreamPlayerProps> = ({ videoId, channelId, dmId, muted = true }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return <div className="w-full h-full bg-black animate-pulse" />;

  // Priority 1: Dailymotion (Bypasses YouTube Geoblocks)
  if (dmId) {
    const embedUrl = `https://www.dailymotion.com/embed/video/${dmId}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&ui-start-screen-info=0`;
    return (
      <iframe src={embedUrl} className="w-full h-full border-0" allow="autoplay; fullscreen" />
    );
  }

  // Priority 2: YouTube Channel ID
  if (channelId) {
    const embedUrl = `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&mute=${muted ? 1 : 0}&rel=0&controls=0`;
    return (
      <iframe src={embedUrl} className="w-full h-full border-0" allow="autoplay; fullscreen" />
    );
  }

  // Priority 3: YouTube Video ID
  if (videoId) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&controls=0`;
    return (
      <iframe src={embedUrl} className="w-full h-full border-0" allow="autoplay; fullscreen" />
    );
  }

  return <div className="w-full h-full bg-black" />;
};
