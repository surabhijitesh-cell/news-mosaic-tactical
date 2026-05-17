'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Activity, Languages } from 'lucide-react';

interface LiveTranslatorProps {
  channelId: string;
  isActive: boolean;
  sourceLang?: string;
  targetLang?: string;
}

export const LiveTranslator: React.FC<LiveTranslatorProps> = ({
  channelId,
  isActive,
  sourceLang = 'bn',
  targetLang = 'en'
}) => {
  const [subtitles, setSubtitles] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Simulated live translation connection
  // Connects to hypothetical translation pipeline when channel is focused
  useEffect(() => {
    if (!isActive) {
      setSubtitles('');
      setIsTranslating(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    setIsTranslating(true);
    
    // Simulate connection delay for the Web Worker pipeline
    timeoutRef.current = setTimeout(() => {
      setSubtitles('Initializing real-time AI translation pipeline...');
      
      const banglaNewsPhrases = [
        "The Election Commission has just announced the final dates for the upcoming municipal polls.",
        "Protests have erupted near the university campus regarding the recent policy changes.",
        "We are getting live updates from the disaster management headquarters in Dhaka.",
        "Heavy rainfall is expected in the coastal regions of Chittagong over the next 48 hours.",
        "The Supreme Court has delivered a landmark verdict on the ongoing constitutional case.",
        "Authorities have increased security across all major metropolitan areas following the alert.",
        "Market indices at the Dhaka Stock Exchange closed significantly higher today."
      ];

      let currentIndex = 0;
      
      const interval = setInterval(() => {
        setSubtitles(banglaNewsPhrases[currentIndex]);
        currentIndex = (currentIndex + 1) % banglaNewsPhrases.length;
      }, 5000);

      return () => clearInterval(interval);
    }, 1500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isActive, channelId]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-x-0 bottom-0 z-[100] pointer-events-none flex flex-col justify-end p-4">
      {/* Translation Badge */}
      <div className="absolute bottom-20 left-4 flex items-center gap-2 bg-blue-900/90 backdrop-blur-md px-2 py-1 rounded-sm border border-blue-500/50 w-fit shadow-lg">
        <Languages className="w-3 h-3 text-blue-400" />
        <span className="text-[9px] font-mono text-blue-100 uppercase tracking-widest font-bold flex items-center gap-2">
          Live Translation <Activity className="w-3 h-3 text-blue-400 animate-pulse" />
        </span>
        <span className="text-[9px] font-mono text-blue-300/60 uppercase border-l border-blue-500/50 pl-2">
          {sourceLang.toUpperCase()} → {targetLang.toUpperCase()}
        </span>
      </div>

      {/* Subtitle Overlay */}
      {subtitles && (
        <div className="w-full max-w-4xl mx-auto bg-black/70 backdrop-blur-md border-l-2 border-blue-500 p-3 mt-4 mb-2 animate-in fade-in slide-in-from-bottom-2 shadow-xl rounded-r-sm">
          <p className="text-white text-sm md:text-base lg:text-lg font-medium font-sans drop-shadow-md text-center tracking-wide leading-relaxed">
            {subtitles}
          </p>
        </div>
      )}
    </div>
  );
};
