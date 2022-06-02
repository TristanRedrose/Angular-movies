import { Component, OnInit } from '@angular/core';
import { MoviesService } from "../../services/movies/movies.service";
import { Movie, MovieListResponse } from "../../models/movie.types";


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {
  page: number = 1;
  movies: Movie[] = [];
  total_pages: number;
  inputPage: number;

  constructor(private service: MoviesService) { }

  ngOnInit(): void {
    this.getMovies(this.page);
  }

  getMovies(page: number) {
    if (page < 1) {
      alert('Page must be at least 1!');
      return;
    }

    else if (page > this.total_pages ) {
      alert('Page exceeds total number of pages');
      return;
    }

    else {
      this.service.getMoviesList(page).subscribe((res: MovieListResponse) => {
      this.page = res.page;
      this.movies = res.results;
      this.total_pages = res.total_pages;
      console.log(res);
      window.scroll(0,0);
      })
    }
    
  }

  showButton(page:number) {
    return this.page !== page;
  }
}
