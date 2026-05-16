export const channels: Channel[] = [
  { id: 'cna', name: 'CNA Global', category: 'english', videoId: 'XWq5kBlakcQ' },
  { id: 'india-today', name: 'India Today', category: 'english', videoId: '4vZFtAlhbWs' },
  { id: 'republic', name: 'Republic TV', category: 'english', videoId: 'AYOrOtIhjrk' },
  { id: 'news18', name: 'News18 English', category: 'english', videoId: 'rfDx1HMvXbQ' },
  { id: 'al-jazeera', name: 'Al Jazeera', category: 'english', videoId: 'gCNeDWCI0vo' },
  { id: 'ndtv', name: 'NDTV India', category: 'hindi', videoId: 'MN8p-Vrn6G0' },
  // 🇧🇩 THE RAW UPLINKS (Bypasses all geoblocks)
  { 
    id: 'somoy-raw', 
    name: 'Somoy TV (Raw Feed)', 
    category: 'hindi', 
    hlsUrl: 'https://shaka.somoynews.tv/live/somoy.m3u8' 
  },
  { 
    id: 'jamuna-raw', 
    name: 'Jamuna TV (Raw Feed)', 
    category: 'hindi', 
    hlsUrl: 'https://live-cdn.jagobd.com/jamuna/index.m3u8' 
  },
  { id: 'india-tv', name: 'India TV', category: 'hindi', videoId: 'zzT9Xqfp2UM' },
];
