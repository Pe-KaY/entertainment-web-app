import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiService } from '../services/api-service/api.service';
import * as storeActions from './store.actions';
import { Video } from '../../interface/interface';

@Injectable()
export class VideoEffects {
  constructor(private actions$: Actions, private videoService: ApiService) {}

  // Effect to load videos
  loadVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadVideos), // Listen for the loadVideos action
      mergeMap(() =>
        this.videoService.fetchData().pipe(
          map((videos: Video[]) => storeActions.loadVideosSuccess({ videos })), // Dispatch success action
          catchError((error) => of(storeActions.loadVideosFailure({ error }))) // Dispatch failure action
        )
      )
    )
  );
}
