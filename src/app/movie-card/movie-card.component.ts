import { Component, Input } from '@angular/core';
import { Video } from '../../interface/interface';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {

  @Input()video!: Video
}
