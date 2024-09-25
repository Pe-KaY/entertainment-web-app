import { Component, Input } from '@angular/core';
import { Video } from '../../interface/interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trending-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending-card.component.html',
  styleUrl: './trending-card.component.scss',
})
export class TrendingCardComponent {
  @Input() video!: Video;
}
