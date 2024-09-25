import { createAction, props } from '@ngrx/store';
import { Video } from '../../interface/interface';

// Action to toggle the isBookmarked status of a video
export const toggleBookmark = createAction(
  '[Video] Toggle Bookmark',
  props<{ videoTitle: string; isBookmarked: boolean }>()
);

// Action to set the category filter
export const setCategory = createAction(
  '[Video] Set Category',
  props<{ category: string }>()
);

// Action to load videos
export const loadVideos = createAction('[Video] Load Videos');

// Action to handle successful loading of videos
export const loadVideosSuccess = createAction(
  '[Video] Load Videos Success',
  props<{ videos: Video[] }>()
);

// Action to handle failure of loading videos
export const loadVideosFailure = createAction(
  '[Video] Load Videos Failure',
  props<{ error: any }>()
);
