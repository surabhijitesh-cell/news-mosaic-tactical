export interface Channel {
  id: string;
  name: string;
  category: 'english' | 'hindi';
  videoId?: string;
  channelId?: string;
  dmId?: string;
  webUrl?: string;
  hlsUrl?: string;
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
  // Hindi National (4)
  {
    id: 'aaj-tak',
    name: 'Aaj Tak',
    category: 'hindi',
    videoId: 'D9Bg7MPrFwU',
  },
  {
    id: 'zee-news',
    name: 'Zee News',
    category: 'hindi',
    videoId: 'VY_UrG9bkiA',
  },
  {
    id: 'abp-news',
    name: 'ABP News',
    category: 'hindi',
    videoId: 'kZ0fwfSKoII',
  },
  {
    id: 'india-tv',
    name: 'India TV',
    category: 'hindi',
    videoId: 'zzT9Xqfp2UM',
  },
];
