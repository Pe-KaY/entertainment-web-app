import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Video } from '../../interface/interface';
import { Store } from '@ngrx/store';
import { toggleBookmark } from '../store/store.actions';
import { DataService } from '../services/dataServices/data.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  constructor(private store: Store, public dataService: DataService) {}

  @Input() video!: Video;

  bookmark(videoTitle: string) {
    if (!this.dataService.userlogin) {
      this.dataService.showLoginToBookmarkWarning();
      return;
    }
    // Toggle isBookmarked based on the current state of this.video
    const isBookmarked = !this.video.isBookmarked;
    // Dispatch the action to toggle bookmark
    this.store.dispatch(toggleBookmark({ videoTitle, isBookmarked }));
  }
}
