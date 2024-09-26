import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  // define check if local storage is available
  localstorage = typeof window !== 'undefined';
  // login Modal
  modal = false;
  // active category
  activeCategory = 'All';
  // userlogged in
  userlogin =  this.localstorage ? localStorage.getItem('username') ? true : false : false;
  // categories
  allCategory = true;
  moviesCategory = false;
  tvSeriesCategory = false;
  bookedCategory = false;
  searching = false;
  // active icon
  all = true;
  movies = false;
  tvSeries = false;
  bookmarked = false;
  resetIcons() {
    this.all = false;
    this.movies = false;
    this.tvSeries = false;
    this.bookmarked = false;
  }

  // function to set the active category
  setActiveCategory(category: string) {
    this.activeCategory = category;
    this.setCategory(category);
  }

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
        this.resetIcons();
        this.all = true;
        break;
      case 'Movies':
        this.moviesCategory = true;
        this.resetIcons();
        this.movies = true;
        break;
      case 'TV Series':
        this.tvSeriesCategory = true;
        this.resetIcons();
        this.tvSeries = true;
        break;
      case 'Bookmarked':
        this.bookedCategory = true;
        this.resetIcons();
        this.bookmarked = true;
        break;
      case 'Searching':
        this.searching = true;
        break;
      default:
        break;
    }
  }

  // show login to bookmark warning
  showWarning = false;
  showLoginToBookmarkWarning() {
    this.showWarning = true;
    setTimeout(() => {
      this.showWarning = false;
    }, 3000);
  }
}
