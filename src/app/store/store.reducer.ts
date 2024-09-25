import { createReducer, on } from '@ngrx/store';
import { VideoState } from '../../interface/interface';
import * as storeActions from './store.actions';

const initialState: VideoState = {
  videoData: [],
  category: '',
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
  on(storeActions.setCategory, (state, { category }) => {
    return { ...state, category };
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
  })
);
