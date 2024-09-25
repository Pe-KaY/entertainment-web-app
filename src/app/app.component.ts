import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api-service/api.service';
import { Video } from '../interface/interface';
import { loadVideos } from './store/store.actions';
import { Store } from '@ngrx/store';
// import components
import { MovieCardComponent } from './movie-card/movie-card.component';
import { TrendingCardComponent } from './trending-card/trending-card.component';
import { Observable } from 'rxjs';
// import selectors
import {
  selectTrendingVideos,
  selectBookmarkedVideos,
  selectVideosBySearch,
  selectMovies,
  selectTVSeries,
  selectRecommended,
} from './store/store.selectors';
// import data store
import { DataService } from './services/dataServices/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MovieCardComponent,
    TrendingCardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public dataService: DataService, private store: Store<Video[]>) {}

  // obserables
  trendingVideos$!: Observable<Video[]>;
  tvSeriesVideos$!: Observable<Video[]>;
  moviesVideos$!: Observable<Video[]>;
  bookmarkedVideos$!: Observable<Video[]>;
  searchVideos$!: Observable<Video[]>;
  recommendedVideos$!: Observable<Video[]>;

  ngOnInit() {
    // fetch data
    this.store.dispatch(loadVideos());

    // assign observables
    this.trendingVideos$ = this.store.select(selectTrendingVideos);
    this.tvSeriesVideos$ = this.store.select(selectTVSeries);
    this.moviesVideos$ = this.store.select(selectMovies);
    this.bookmarkedVideos$ = this.store.select(selectBookmarkedVideos);
    this.searchVideos$ = this.store.select(selectVideosBySearch);
    this.recommendedVideos$ = this.store.select(selectRecommended);
  }
}
