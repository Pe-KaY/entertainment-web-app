import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api-service/api.service';
import { Video } from '../interface/interface';
import { loadVideos, toggleAllBookmarksToFalse } from './store/store.actions';
import { Store } from '@ngrx/store';
// import components
import { MovieCardComponent } from './movie-card/movie-card.component';
import { TrendingCardComponent } from './trending-card/trending-card.component';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  mergeMap,
  Observable,
} from 'rxjs';
// import selectors
import {
  selectTrendingVideos,
  selectBookmarkedVideos,
  selectVideosBySearch,
  selectMovies,
  selectTVSeries,
  selectRecommended,
  selectCategory,
} from './store/store.selectors';
// import data store
import { DataService } from './services/dataServices/data.service';
import { setCategory } from './store/store.actions';

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
  selectCategory$!: Observable<string>;

  @ViewChild('search') search!: ElementRef;

  ngOnInit() {
    // fetch data
    this.store.dispatch(loadVideos());
    this.store.dispatch(toggleAllBookmarksToFalse());

    // assign observables
    this.trendingVideos$ = this.store.select(selectTrendingVideos);
    this.tvSeriesVideos$ = this.store.select(selectTVSeries);
    this.moviesVideos$ = this.store.select(selectMovies);
    this.bookmarkedVideos$ = this.store.select(selectBookmarkedVideos);
    this.searchVideos$ = this.store.select(selectVideosBySearch);
    this.recommendedVideos$ = this.store.select(selectRecommended);
    this.selectCategory$ = this.store.select(selectCategory);
  }

  ngAfterViewInit() {
    // search
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        // if search is empty return to home
        if (value === '') {
          this.dataService.setCategory(this.dataService.activeCategory);
          return;
        }
        this.dataService.setCategory('Searching');
        this.dispatchSearch(value, this.dataService.activeCategory);
      });
  }

  dispatchSearch(value: string, category: string) {
    console.log(this.dataService.activeCategory);

    this.store.dispatch(
      setCategory({ category: value, actCategory: category })
    );
  }

  profileClick() {
    if (this.dataService.userlogin) {
      return;
    }
    this.dataService.modal = true;
  }
}
