export interface StreamConfig {
  primary: string;
  backups: string[];
}

export interface Channel {
  id: string | number;
  name: string;
  category: 'english' | 'hindi' | 'regional';
  videoId?: string;
  streams?: StreamConfig;
}

export const channels: Channel[] = [
  { id: 1, name: 'CNA Global', category: 'english', videoId: 'XWq5kBlakcQ' },
  { id: 2, name: 'India Today', category: 'english', videoId: '4vZFtAlhbWs' },
  { id: 3, name: 'Republic TV', category: 'english', videoId: 'AYOrOtIhjrk' },
  { id: 4, name: 'News18 English', category: 'english', videoId: 'rfDx1HMvXbQ' },
  { id: 5, name: 'Al Jazeera', category: 'english', videoId: 'gCNeDWCI0vo' },
  { id: 6, name: 'NDTV India', category: 'hindi', videoId: 'MN8p-Vrn6G0' },
  
  // 🇧🇩 MOSAIC SLOT 7: JAMUNA TV (BANGLADESH)
  { 
    id: 7, 
    name: 'Jamuna TV', 
    category: 'regional',
    streams: {
      primary: "https://live-cdn.jagobd.com/jamuna/index.m3u8",
      backups: [
        "https://jamunatv.fstream.online/jamunatv/index.m3u8",
        "https://shaka.somoynews.tv/live/somoy.m3u8" // Emergency backup
      ]
    }
  },
  
  // 🇧🇩 MOSAIC SLOT 8: SOMOY TV (BANGLADESH)
  { 
    id: 8, 
    name: 'Somoy TV', 
    category: 'regional',
    streams: {
      primary: "https://shaka.somoynews.tv/live/somoy.m3u8",
      backups: [
        "https://somoytv.fstream.online/somoytv/index.m3u8",
        "https://live-cdn.jagobd.com/somoy/index.m3u8"
      ]
    }
  },
  
  { id: 9, name: 'India TV', category: 'hindi', videoId: 'zzT9Xqfp2UM' },
];
