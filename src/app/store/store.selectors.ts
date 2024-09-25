import { createSelector, createFeatureSelector } from '@ngrx/store';
import { VideoState } from '../../interface/interface';
import { Video } from '../../interface/interface';

// Feature selector for the entire video state
export const selectVideoState = createFeatureSelector<VideoState>('videoState');

// 1. Selector for trending videos (isTrending = true)
export const selectTrendingVideos = createSelector(
  selectVideoState,
  (state: VideoState) =>
    state.videoData.filter((video: Video) => video.isTrending)
);

// 2. Selector for TV Series (category = 'tvseries')
export const selectTVSeries = createSelector(
  selectVideoState,
  (state: VideoState) =>
    state.videoData.filter((video: Video) => video.category === 'TV Series')
);

// 3. Selector for Movies (category = 'movies')
export const selectMovies = createSelector(
  selectVideoState,
  (state: VideoState) =>
    state.videoData.filter((video: Video) => video.category === 'Movie')
);

// 4. Selector for Bookmarked videos (isBookmarked = true)
export const selectBookmarkedVideos = createSelector(
  selectVideoState,
  (state: VideoState) =>
    state.videoData.filter((video: Video) => video.isBookmarked)
);

// 5. Selector for all recommended videos (exluding trending videos)
export const selectRecommended = createSelector(
  selectVideoState,
  (state: VideoState) =>
    state.videoData.filter((video: Video) => !video.isTrending)
);

// 6. Selector for videos by search
export const selectVideosBySearch = createSelector(
  selectVideoState,
  (state: VideoState) => {
    const { videoData, category } = state;
    if (!category) return videoData; // If category is empty, return all videos
    return videoData.filter((video) => video.category === category); // Filter by category
  }
);
