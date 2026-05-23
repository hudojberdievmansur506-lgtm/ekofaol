export interface ImageSlide {
  url: string;
  alt: string;
}

export interface EcoActivity {
  id: string;
  title: string;
  category: 'planting' | 'recycling' | 'clean_up' | 'education' | 'other';
  studentName: string;
  faculty: string;
  description: string;
  date: string;
  images: ImageSlide[];
  likes: number;
}

export interface GreenProject {
  id: string;
  title: string;
  category: 'energy' | 'water' | 'flora' | 'waste';
  description: string;
  highlights: string[];
  metrics: {
    label: string;
    value: string;
    progress: number;
  }[];
  images: ImageSlide[];
}

export interface LeaderboardUser {
  id: string;
  name: string;
  faculty: string;
  points: number;
  rank: number;
  avatar: string;
  activitiesCount: number;
}
