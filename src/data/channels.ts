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
  // SLOT 7: Independent TV (Bangladesh 24/7)
  {
    id: 'independent-tv',
    name: 'Independent TV',
    category: 'local',
    channelId: 'UC1kEq9zZAXI4z2lIav-h5zQ',
  },
  // SLOT 8: Channel 24 (Bangladesh 24/7)
  {
    id: 'channel-24',
    name: 'Channel 24',
    category: 'local',
    channelId: 'UC4sL1PqH_dJmI3F9Vj15NlA',
  },
  {
    id: 'india-tv',
    name: 'India TV',
    category: 'local',
    videoId: 'zzT9Xqfp2UM',
  },
];
