import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api-service/api.service';
import { Video } from '../interface/interface';
import { loadVideos } from './store/store.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private apiService: ApiService, private store: Store<Video[]>) {}

  ngOnInit() {
    this.store.dispatch(loadVideos());
  }
}
