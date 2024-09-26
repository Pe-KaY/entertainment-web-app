import { createReducer, on } from '@ngrx/store';
import { VideoState } from '../../interface/interface';
import * as storeActions from './store.actions';


const initialState: VideoState = {
  videoData: [],
  category: '',
  actCategory: 'All',
};

export const videoReducer = createReducer(
  initialState,
  on(storeActions.toggleBookmark, (state, { videoTitle, isBookmarked }) => {
    const updatedVideos = state.videoData.map((video) => {
      if (video.title === videoTitle) {
        return { ...video, isBookmarked };
      }
      return video;
    });
    return { ...state, videoData: updatedVideos };
  }),
  on(storeActions.setCategory, (state, { category, actCategory }) => {
    return { ...state, category , actCategory }; 
  }),
  on(storeActions.loadVideos, (state) => ({
    ...state,
    videoData: [], // Clear previous videos while loading
  })),
  on(storeActions.loadVideosSuccess, (state, { videos }) => ({
    ...state,
    videoData: videos, // Update the state with loaded videos
  })),
  on(storeActions.loadVideosFailure, (state, { error }) => {
    console.error(error); // Handle error (you may want to add error state)
    return state; // Return the current state on error
  }),
    // Handle toggleAllBookmarksToFalse action
    on(storeActions.toggleAllBookmarksToFalse, (state) => {
      const updatedVideoData = state.videoData.map((video) => ({
        ...video,
        isBookmarked: video.isBookmarked ? false : video.isBookmarked, // Set to false only if true
      }));
  
      return {
        ...state,
        videoData: updatedVideoData,
      };
    })
);
