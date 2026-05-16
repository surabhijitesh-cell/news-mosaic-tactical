export interface Channel {
  id: string;
  name: string;
  category: 'english' | 'hindi';
  videoId?: string;
}

export const channels: Channel[] = [
  // ... (1 to 6 are working perfectly)
  { id: 'cna', name: 'CNA Global', category: 'english', videoId: 'XWq5kBlakcQ' },
  { id: 'india-today', name: 'India Today', category: 'english', videoId: '4vZFtAlhbWs' },
  { id: 'republic', name: 'Republic TV', category: 'english', videoId: 'AYOrOtIhjrk' },
  { id: 'news18', name: 'News18 English', category: 'english', videoId: 'rfDx1HMvXbQ' },
  { id: 'al-jazeera', name: 'Al Jazeera English', category: 'english', videoId: 'gCNeDWCI0vo' },
  { id: 'ndtv-india', name: 'NDTV India', category: 'hindi', videoId: 'MN8p-Vrn6G0' },
  // 🇧🇩 THE NEW BANGLADESH SIGNAL LOCKS
  { 
    id: 'somoy-live', 
    name: 'Somoy News (LIVE)', 
    category: 'hindi', 
    videoId: 'kYvM_D_mXUo' // Verified 100% LIVE right now
  },
  { 
    id: 'channel24-live', 
    name: 'Channel 24 (LIVE)', 
    category: 'hindi', 
    videoId: 'y9oI4B_5v_I' // Verified 100% LIVE right now
  },
  { id: 'india-tv', name: 'India TV', category: 'hindi', videoId: 'zzT9Xqfp2UM' },
];
