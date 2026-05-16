export interface Channel {
  id: string;
  name: string;
  category: 'english' | 'hindi';
  videoId?: string;
}

export const channels: Channel[] = [
  { id: 'cna', name: 'CNA Global', category: 'english', videoId: 'XWq5kBlakcQ' },
  { id: 'india-today', name: 'India Today', category: 'english', videoId: '4vZFtAlhbWs' },
  { id: 'republic', name: 'Republic TV', category: 'english', videoId: 'AYOrOtIhjrk' },
  { id: 'news18', name: 'News18 English', category: 'english', videoId: 'rfDx1HMvXbQ' },
  { id: 'al-jazeera', name: 'Al Jazeera', category: 'english', videoId: 'gCNeDWCI0vo' },
  { id: 'ndtv', name: 'NDTV India', category: 'hindi', videoId: 'MN8p-Vrn6G0' },
    // 🛰️ MASTER HANDSHAKE SIGNALS
  { 
    id: 'northeast-live', 
    name: 'Northeast Live (English)', 
    category: 'english', 
    videoId: 'Oms0ZfN4Kms' 
  },
  { 
    id: 'mizzima-tv', 
    name: 'Mizzima TV (Myanmar)', 
    category: 'english', 
    videoId: 'q_jCIsM9F2o' 
  },
  { id: 'india-tv', name: 'India TV', category: 'hindi', videoId: 'zzT9Xqfp2UM' },
];
