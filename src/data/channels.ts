export interface Channel {
  id: string;
  name: string;
  category: 'english' | 'hindi';
  videoId?: string;
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
    id: 'france24-english',
    name: 'France 24 Global',
    category: 'english',
    videoId: 'aU_VByI9Sg0', // Swapped Sky News for stable France 24
  },
  // Regional & Hindi (4)
  {
    id: 'ndtv-india',
    name: 'NDTV India',
    category: 'hindi',
    videoId: 'MN8p-Vrn6G0',
  },
  {
    id: 'jamuna-tv',
    name: 'Jamuna TV (Bangladesh)',
    category: 'hindi',
    videoId: '60ItREp0X_A',
  },
  {
    id: 'rtv-live',
    name: 'RTV News (Bangladesh)',
    category: 'hindi',
    videoId: 'y9oI4B_5v_I',
  },
  {
    id: 'india-tv',
    name: 'India TV',
    category: 'hindi',
    videoId: 'zzT9Xqfp2UM',
  },
];
