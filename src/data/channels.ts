export interface StreamConfig {
  primary: string;
  backups: string[];
}

export interface TranslationConfig {
  enabled: boolean;
  sourceLanguage: string;
  targetLanguage: string;
  subtitleOverlay: boolean;
  voiceTranslation: boolean;
}

export interface Channel {
  id: string;
  name: string;
  category: 'english' | 'hindi' | 'regional' | 'local';
  videoId?: string;
  channelId?: string;
  dmId?: string;
  webUrl?: string;
  hlsUrl?: string;
  streams?: StreamConfig;
  translation?: TranslationConfig;
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
  // Hindi National / Regional
  {
    id: 'aaj-tak',
    name: 'Aaj Tak',
    category: 'local',
    videoId: 'D9Bg7MPrFwU',
  },
  // SLOT 7: Independent TV (Bangladesh Live 24/7)
  {
    id: 'independent-tv',
    name: 'Independent TV',
    category: 'local',
    videoId: 'BnGq0K0HmR4',
    translation: {
      enabled: true,
      sourceLanguage: 'bn',
      targetLanguage: 'en',
      subtitleOverlay: true,
      voiceTranslation: false
    }
  },
  // SLOT 8: Channel i (Bangladesh Live News)
  {
    id: 'channel-i',
    name: 'Channel i',
    category: 'local',
    videoId: '39l8BwueQU0',
    translation: {
      enabled: true,
      sourceLanguage: 'bn',
      targetLanguage: 'en',
      subtitleOverlay: true,
      voiceTranslation: false
    }
  },
  {
    id: 'india-tv',
    name: 'India TV',
    category: 'local',
    videoId: 'zzT9Xqfp2UM',
  },
];
