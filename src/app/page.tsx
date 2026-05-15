'use client';

import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Maximize2, X, Activity, Shield, Zap } from 'lucide-react';
import { channels as initialChannels, Channel } from '@/data/channels';
import { StreamPlayer } from '@/components/dashboard/StreamPlayer';
import { useStreamStore } from '@/store/useStreamStore';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const { activeAudioId, setActiveAudioId, focusedId, setFocusedId } = useStreamStore();
  const [times, setTimes] = useState({
    ist: '',
    est: '',
    gmt: '',
    mmt: '',
    bst: '',
    cst: ''
  });

  useEffect(() => {
    setIsMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFocusedId(null);
    };
    window.addEventListener('keydown', handleKeyDown);

    const timer = setInterval(() => {
      const now = new Date();
      setTimes({
        ist: now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }),
        est: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false }),
        gmt: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour12: false }),
        mmt: now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Yangon', hour12: false }),
        bst: now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Dhaka', hour12: false }),
        cst: now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Shanghai', hour12: false })
      });
    }, 1000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(timer);
    };
  }, []);

  if (!isMounted) return <div className="bg-black w-screen h-screen" />;

  const updateChannelId = (id: string, newId: string) => {
    setChannels(prev => prev.map(c => 
      c.id === id ? { ...c, videoId: newId, webUrl: undefined, dmId: undefined } : c
    ));
  };

  const focusedChannel = channels.find(c => c.id === focusedId);

  return (
    <main className="relative min-h-screen bg-[#050505] overflow-hidden p-1">
      {/* Tactical Header */}
      <header className="flex justify-between items-center p-3 mb-1 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center font-bold text-black text-[10px]">NM</div>
          <div>
            <h1 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Live News Mosaic</h1>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[7px] font-mono text-white/30 uppercase tracking-widest font-bold">System Online | Satellite Feed Active</span>
            </div>
          </div>
        </div>

        {/* Global Clock Array - Tactical HUD */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-1 py-1 rounded-sm">
           {[
             { label: 'IST', time: times.ist, region: 'ASIA/IND' },
             { label: 'EST', time: times.est, region: 'USA/DC' },
             { label: 'GMT', time: times.gmt, region: 'EUR/UK' },
             { label: 'MMT', time: times.mmt, region: 'SEA/MMR' },
             { label: 'BST', time: times.bst, region: 'SA/BGD' },
             { label: 'CST', time: times.cst, region: 'ASIA/CHN' },
           ].map((item, idx) => (
             <div key={item.label} className={`flex items-center gap-3 px-4 py-1.5 ${idx !== 0 ? 'border-l border-white/10' : ''}`}>
                <div className="flex flex-col">
                   <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em]">{item.label}</span>
                   <span className="text-[5px] font-mono text-white/20 uppercase tracking-tighter">{item.region}</span>
                </div>
                <div className="text-[12px] font-mono text-white font-black tracking-widest bg-black/40 px-2 py-0.5 rounded-sm border border-white/5 shadow-inner">
                   {item.time}
                </div>
             </div>
           ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-4 text-[8px] font-mono text-white/20 uppercase tracking-widest border-r border-white/10 pr-4">
             <div>5 English | 4 Hindi</div>
             <div>National Phase 1</div>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-2 py-1 bg-white/5 hover:bg-white/10 text-[8px] font-mono text-white/40 hover:text-white transition-all uppercase tracking-widest border border-white/5"
          >
            Reload Dashboard
          </button>
        </div>
      </header>

      {/* 3x3 Dynamic Grid */}
      <div className="grid grid-cols-3 gap-1 h-[calc(100vh-105px)]">
        {channels.map((channel) => {
          const isActive = activeAudioId === channel.id;
          
          return (
            <div 
              key={channel.id}
              onClick={() => setActiveAudioId(channel.id)}
              className={`relative bg-black border transition-all duration-300 group
                ${isActive ? 'border-red-600 ring-1 ring-red-600/20 z-10' : 'border-white/5 hover:border-white/20'}
              `}
            >
              {/* Tile HUD */}
              <div className="absolute top-0 left-0 right-0 z-20 p-2 flex justify-between items-start pointer-events-none">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 px-1.5 py-0.5 bg-red-600 text-[8px] font-bold text-white uppercase tracking-tighter">
                    <span className="w-1 h-1 bg-white rounded-full animate-pulse" /> Live
                  </div>
                  <div className="px-1.5 py-0.5 bg-black/80 text-[9px] font-mono text-white/80 border border-white/10 uppercase">
                    {channel.name}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pointer-events-auto">
                  {/* Audio Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveAudioId(isActive ? null : channel.id);
                    }}
                    className={`p-1.5 rounded bg-black/60 border border-white/10 hover:bg-red-900/40 transition-colors ${isActive ? 'text-red-500 border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'text-white/40'}`}
                    title={isActive ? "Mute" : "Unmute"}
                  >
                    {isActive ? (
                      <Volume2 className="w-3 h-3" />
                    ) : (
                      <VolumeX className="w-3 h-3" />
                    )}
                  </button>

                  {/* Expand Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFocusedId(channel.id);
                    }}
                    className="p-1.5 rounded bg-black/60 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                    title="Cinematic Focus"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>

                  {/* Manual Update Trigger */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const newId = prompt(`Enter new YouTube ID for ${channel.name}:`, channel.videoId || '');
                      if (newId) updateChannelId(channel.id, newId);
                    }}
                    className="p-1 bg-white/5 hover:bg-white/10 text-white/20 hover:text-white rounded opacity-0 group-hover:opacity-100 transition-all"
                    title="Update Stream Source"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                </div>
              </div>

              {/* Video Interface */}
              <div className="w-full h-full grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500">
                <StreamPlayer 
                  videoId={channel.videoId} 
                  channelId={channel.channelId}
                  dmId={channel.dmId}
                  hlsUrl={channel.hlsUrl}
                  webUrl={channel.webUrl}
                  muted={!isActive}
                />
              </div>

              {/* Status Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5 overflow-hidden">
                 {isActive && <div className="h-full bg-red-600 w-full animate-pulse" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Intel Brief Ticker */}
      <footer className="fixed bottom-0 left-0 right-0 h-8 bg-black border-t border-white/5 flex items-center overflow-hidden z-[90]">
        <div className="flex items-center bg-red-900/40 px-3 h-full border-r border-white/10 gap-2 shrink-0 z-10">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-red-500">Intel Brief</span>
        </div>
        <div className="flex items-center gap-12 animate-marquee-scrolling whitespace-nowrap px-6">
          {[
            "PRIORITY ALPHA: BHOJSHALA VERDICT LIVE COVERAGE IN PROGRESS",
            "SIGNAL LOCK: ALL 9 SATELLITE FEEDS ACTIVE",
            "GLOBAL ALERT: PETROL AND DIESEL PRICES HIKED NATIONWIDE",
            "REGIONAL INTEL: MONITORING SEA/MMR THEATER FOR OPERATIONAL UPDATES",
            "INTEL UPDATE: NEET EXAM LEAK INVESTIGATION INTENSIFIES",
            "THEATER STATUS: CHINA STANDARD TIME (CST) ENTERING NIGHT CYCLE",
            "SYSTEM STATUS: ALL ENCRYPTION PROTOCOLS SECURE [SATLINK-01]",
            "PRIORITY ALPHA: BHOJSHALA VERDICT LIVE COVERAGE IN PROGRESS",
            "SIGNAL LOCK: ALL 9 SATELLITE FEEDS ACTIVE",
          ].map((brief, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-white/60 tracking-wider uppercase">{brief}</span>
              <span className="text-white/10">•</span>
            </div>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee-scrolling {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-scrolling {
            animation: marquee-scrolling 60s linear infinite;
            display: flex;
            width: max-content;
          }
        `}} />
      </footer>

      {/* Cinematic Focus Overlay */}
      {focusedChannel && (
        <div className="fixed inset-0 z-[100] bg-black animate-in fade-in zoom-in duration-300">
          <div className="absolute inset-0 flex items-center justify-center p-4">
             <div className="w-full h-full max-w-[90vw] max-h-[90vh] relative border border-white/10 shadow-[0_0_100px_rgba(239,68,68,0.1)]">
                <StreamPlayer 
                  videoId={focusedChannel.videoId} 
                  channelId={focusedChannel.channelId}
                  dmId={focusedChannel.dmId}
                  hlsUrl={focusedChannel.hlsUrl}
                  webUrl={focusedChannel.webUrl}
                  muted={false} // Always unmute in focus mode
                />
                
                {/* Cinematic HUD Overlay */}
                <div className="absolute inset-0 pointer-events-none border-[20px] border-black/20">
                   <div className="absolute top-8 left-8 flex items-center gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 px-3 py-1 bg-red-600 text-[10px] font-black text-white uppercase tracking-[0.4em]">
                           <span className="w-2 h-2 bg-white rounded-full animate-ping" /> Signal Active
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter opacity-90">{focusedChannel.name}</h2>
                      </div>
                   </div>

                   {/* Tactical Stats */}
                   <div className="absolute bottom-8 right-8 flex gap-8">
                      <div className="flex flex-col items-end">
                         <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-mono font-bold uppercase tracking-widest">
                            <Zap className="w-3 h-3" /> Signal Strength: 98%
                         </div>
                         <div className="flex items-center gap-2 text-white/30 text-[9px] font-mono uppercase">
                            <Activity className="w-3 h-3" /> Latency: 124ms
                         </div>
                      </div>
                      <div className="flex flex-col items-end">
                         <div className="flex items-center gap-2 text-sky-500 text-[10px] font-mono font-bold uppercase tracking-widest">
                            <Shield className="w-3 h-3" /> Encryption: Secure
                         </div>
                         <div className="flex items-center gap-2 text-white/30 text-[9px] font-mono uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500/20" /> SATLINK-01
                         </div>
                      </div>
                   </div>
                </div>

                {/* Close Controls */}
                <div className="absolute top-8 right-8 pointer-events-auto flex items-center gap-4">
                   <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] border-r border-white/10 pr-4">
                      Press ESC to exit grid
                   </div>
                   <button 
                     onClick={() => setFocusedId(null)}
                     className="p-2 bg-white/5 hover:bg-red-600 hover:text-white text-white/40 rounded-full transition-all border border-white/10"
                   >
                     <X className="w-6 h-6" />
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </main>
  );
}
