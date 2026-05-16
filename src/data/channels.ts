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
    id: 'sky-news',
    name: 'Sky News Global',
    category: 'english',
    videoId: '9Auq9mYyitc',
  },
  // Regional & Hindi (4)
  {
    id: 'ndtv-india',
    name: 'NDTV India',
    category: 'hindi',
    videoId: 'MN8p-Vrn6G0',
  },
  {
    id: 'somoy-tv',
    name: 'Somoy TV (Bangladesh)',
    category: 'hindi', // Grouped with regional
    videoId: 'kYvM_D_mXUo',
  },
  {
    id: 'independent-tv',
    name: 'Independent TV (Bangladesh)',
    category: 'hindi',
    videoId: 'S8L_3ZgC29M',
  },
  {
    id: 'india-tv',
    name: 'India TV',
    category: 'hindi',
    videoId: 'zzT9Xqfp2UM',
  },
];
