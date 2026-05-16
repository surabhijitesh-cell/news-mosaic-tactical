export interface Channel {
  id: string;
  name: string;
  category: 'english' | 'hindi';
  videoId?: string;
  webUrl?: string; // This is the secret bypass
}

export const channels: Channel[] = [
  { id: 'cna', name: 'CNA Global', category: 'english', videoId: 'XWq5kBlakcQ' },
  { id: 'india-today', name: 'India Today', category: 'english', videoId: '4vZFtAlhbWs' },
  { id: 'republic', name: 'Republic TV', category: 'english', videoId: 'AYOrOtIhjrk' },
  { id: 'news18', name: 'News18 English', category: 'english', videoId: 'rfDx1HMvXbQ' },
  { id: 'al-jazeera', name: 'Al Jazeera', category: 'english', videoId: 'gCNeDWCI0vo' },
  { id: 'ndtv', name: 'NDTV India', category: 'hindi', videoId: 'MN8p-Vrn6G0' },
    // 🇧🇩 THE CALIBRATED BYPASS
  { 
    id: 'somoy-web', 
    name: 'Somoy TV (Live)', 
    category: 'hindi', 
    webUrl: 'https://www.somoynews.tv/live' // I will also update the Zoom logic below
  },
  { 
    id: 'channel24-web', 
    name: 'Channel 24 (Live)', 
    category: 'hindi', 
    webUrl: 'https://www.channel24bd.tv/live' 
  },

  { id: 'india-tv', name: 'India TV', category: 'hindi', videoId: 'zzT9Xqfp2UM' },
];
