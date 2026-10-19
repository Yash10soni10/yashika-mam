export interface MemoryPhoto {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  tag: string;
  originalFileName?: string;
  imageSrc?: string;
  aspectRatio?: 'portrait' | 'square' | 'landscape';
  personalNote: string;
  likes: number;
}

export interface TimelineMilestone {
  id: string;
  period: string;
  title: string;
  hinglishHeadline: string;
  story: string;
  quote: string;
  tag: string;
  iconName: 'sparkles' | 'coffee' | 'heart' | 'smile' | 'flame' | 'star';
}

export interface SurpriseMessage {
  id: string;
  title: string;
  text: string;
  type: 'hug' | 'compliment' | 'joke' | 'promise';
}
