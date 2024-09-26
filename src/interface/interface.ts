export interface Video {
  title: string;
  thumbnail: Thumbnail;
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

export interface Thumbnail {
  trending: Trending;
  regular: Regular;
}

export interface Regular {
  small: string;
  medium: string;
  large: string;
}

export interface Trending {
  small: string;
  large: string;
}

export interface VideoState {
  videoData: Video[];
  category: string;
  actCategory: string;
}
