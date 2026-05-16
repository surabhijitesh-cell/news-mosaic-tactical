export interface Channel {
  id: string;
  name: string;
  category: 'english' | 'hindi';
  videoId?: string;
  channelId?: string; // Adding support for permanent channel signals
}

export const channels: Channel[] = [
  // English National & Global (5)
  {
    id: 'cna-news',
    name: 'CNA Global',
    category: 'english',
    videoId: 'XWq5kBlakcQ',
  },
  {
    id: 'india-today',
    name: 'India Today',
    category: 'english',
    videoId: '4vZFtAlhbWs',
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
    id: 'bbc-news',
    name: 'BBC World News',
    category: 'english',
    channelId: 'UC16niRr50-MSBwiO3YDb3RA', // Permanent BBC Signal
  },
  // Regional & Hindi (4)
  {
    id: 'ndtv-india',
    name: 'NDTV India',
    category: 'hindi',
    videoId: 'MN8p-Vrn6G0',
  },
  {
    id: 'somoy-live',
    name: 'Somoy TV (Bangladesh)',
    category: 'hindi',
    channelId: 'UC6L_YkZfL0_0y_T_Y_Z-Y-w', // Permanent Somoy Signal
  },
  {
    id: 'jamuna-live',
    name: 'Jamuna TV (Bangladesh)',
    category: 'hindi',
    channelId: 'UC3S8m1v9z9B-O-90-K-O-O-g', // Permanent Jamuna Signal
  },
  {
    id: 'india-tv',
    name: 'India TV',
    category: 'hindi',
    videoId: 'zzT9Xqfp2UM',
  },
];
