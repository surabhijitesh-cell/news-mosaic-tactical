export interface StreamConfig {
  primary: string;
  backups: string[];
}

export interface Channel {
  id: string;
  name: string;
  category: 'english' | 'hindi' | 'regional' | 'local';
  videoId?: string;
  channelId?: string;
  dmId?: string;
  webUrl?: string;
  hlsUrl?: string;
  streams?: StreamConfig;
}

export const channels: Channel[] = [
  // English National (5)
  {
    id: 'cna-news',
    name: 'CNA Global News',
    category: 'english',
    videoId: 'XWq5kBlakcQ',
  },
  {
    id: 'ndtv-india',
    name: 'NDTV India',
    category: 'hindi',
    videoId: 'MN8p-Vrn6G0',
  },
  {
    id: 'republic-english',
    name: 'Republic TV',
    category: 'english',
    videoId: 'AYOrOtIhjrk',
  },
  {
    id: 'news18-english',
    name: 'News18 English',
    category: 'english',
    videoId: 'rfDx1HMvXbQ',
  },
  {
    id: 'india-today',
    name: 'India Today',
    category: 'english',
    videoId: '4vZFtAlhbWs',
  },
  // Hindi National / Regional
  {
    id: 'aaj-tak',
    name: 'Aaj Tak',
    category: 'local',
    videoId: 'D9Bg7MPrFwU',
  },
  // SLOT 7: Jamuna TV
  {
    id: 'jamuna-tv',
    name: 'Jamuna TV',
    category: 'local',
    streams: {
      primary: "https://jamunatv.fstream.online/jamunatv/index.m3u8",
      backups: [
        "https://live-cdn.jagobd.com/jamuna/index.m3u8",
        "https://jamuna-live-cdn.jagobd.com/c3VydmVyX8RpbWU9MTcvMDQvMjAxNCAxMTo1Mjo0MSBBTSZoYXNoPWEwMDU0ODYzMTRiMmNmYTU1OWUyMWZlYWNjM2YwZmFi/jamuna/index.m3u8"
      ]
    }
  },
  // SLOT 8: Somoy TV
  {
    id: 'somoy-tv',
    name: 'Somoy TV',
    category: 'local',
    streams: {
      primary: "https://somoytv.fstream.online/somoytv/index.m3u8",
      backups: [
        "https://shaka.somoynews.tv/live/somoy.m3u8",
        "https://live-cdn.jagobd.com/somoy/index.m3u8"
      ]
    }
  },
  {
    id: 'india-tv',
    name: 'India TV',
    category: 'local',
    videoId: 'zzT9Xqfp2UM',
  },
];
