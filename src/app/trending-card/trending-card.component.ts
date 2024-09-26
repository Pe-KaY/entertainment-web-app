import { Component, Input } from '@angular/core';
import { Video } from '../../interface/interface';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toggleBookmark } from '../store/store.actions';
import { DataService } from '../services/dataServices/data.service';

@Component({
  selector: 'app-trending-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending-card.component.html',
  styleUrl: './trending-card.component.scss',
})
export class TrendingCardComponent {
  @Input() video!: Video;

  constructor(private store: Store, public dataService: DataService) {}


  bookmark(videoTitle: string) {
    if(!this.dataService.userlogin){
      this.dataService.showLoginToBookmarkWarning();
      return
    }
    // Toggle isBookmarked based on the current state of this.video
    const isBookmarked = !this.video.isBookmarked;
    // Dispatch the action to toggle bookmark
    this.store.dispatch(toggleBookmark({ videoTitle, isBookmarked }));
  }
}
