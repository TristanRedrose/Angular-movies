import { Component } from '@angular/core';
import { MoviesService } from './services/movies/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private movies: MoviesService) {
    this.movies.getData().subscribe(data => {
      console.warn(data)
    })
  }
}
