export interface Channel {
  id: string;
  name: string;
  category: 'english' | 'hindi';
  videoId?: string;
}

export const channels: Channel[] = [
  // Row 1
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
  // Row 2
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
    videoId: 'gCNeDWCI0vo',
  },
  {
    id: 'ndtv-india',
    name: 'NDTV India',
    category: 'hindi',
    videoId: 'MN8p-Vrn6G0',
  },
  // Row 3 (Bangladesh Focus)
  {
    id: 'somoy-live',
    name: 'Somoy News (Bangladesh)',
    category: 'hindi',
    videoId: 'yA_eZ7K9XoQ', // Fresh, working Somoy ID
  },
  {
    id: 'channel24-live',
    name: 'Channel 24 (Bangladesh)',
    category: 'hindi',
    videoId: 'G5V7OAt9rKk', // Fresh, working Channel 24 ID
  },
  {
    id: 'india-tv',
    name: 'India TV',
    category: 'hindi',
    videoId: 'zzT9Xqfp2UM',
  },
];
