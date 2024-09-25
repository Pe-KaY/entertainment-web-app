import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  allCategory = true;
  moviesCategory = false;
  tvSeriesCategory = false;
  bookedCategory = false;
  searching = false;

  // function to set the category
  setCategory(category: string) {
    this.allCategory = false;
    this.moviesCategory = false;
    this.tvSeriesCategory = false;
    this.bookedCategory = false;
    this.searching = false;
    switch (category) {
      case 'All':
        this.allCategory = true;
        break;
      case 'Movies':
        this.moviesCategory = true;
        break;
      case 'TV Series':
        this.tvSeriesCategory = true;
        break;
      case 'Bookmarked':
        this.bookedCategory = true;
        break;
      case 'Searching':
        this.searching = true;
        break;
      default:
        break;
    }
  }
}
