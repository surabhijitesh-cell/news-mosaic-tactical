export interface Channel {
  id: string;
  name: string;
  category: 'english' | 'hindi';
  videoId?: string;
  channelId?: string;
  dmId?: string; // Adding Dailymotion support
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
    id: 'al-jazeera',
    name: 'Al Jazeera English',
    category: 'english',
    videoId: 'gCNeDWCI0vo', // Swapped BBC for Al Jazeera (More stable)
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
    dmId: 'R_Q-l1RId50', // Dailymotion Signal
  },
  {
    id: 'jamuna-live',
    name: 'Jamuna TV (Bangladesh)',
    category: 'hindi',
    dmId: 'G7O7OAt9rKk', // Dailymotion Signal
  },
  {
    id: 'india-tv',
    name: 'India TV',
    category: 'hindi',
    videoId: 'zzT9Xqfp2UM',
  },
];
