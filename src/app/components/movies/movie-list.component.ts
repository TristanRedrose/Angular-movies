import { Component, OnInit } from '@angular/core';
import { MoviesService } from "../../services/movies/movies.service";
import { Movie, MovieListResponse } from "../../models/movie.types";
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {
  page: number;
  movies: Movie[] = [];
  total_pages: number;
  inputPage: number;
  gotError: boolean;

  constructor(private service: MoviesService, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getPage();
  }

  async getPage() {
    await this.getTotal();
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params['page'] === undefined) {
        this.page = 1;
        this.getMovies(this.page);
      }
      else if (params['page'] < 1) {
        this.goToPage(1);
      }
      else if (params['page'] > this.total_pages) {
        this.goToPage(this.total_pages);
      }
      else {
        this.page = +(params['page']);
        this.getMovies(this.page);
      }
    })
  }

  goToPage(page: number) {
    console.log(page);
    if (page < 1) {
      alert('Page must be at least 1!');
      return;
    }
    else if (page > this.total_pages ) {
      alert('Page exceeds total number of pages');
      return;
    }
    else {
      this.router.navigate(
        ["/movies"],
        {queryParams: {page: page}}
      )
    }
  }
  
  goToPrevPage() {
    this.page = this.page - 1;
    this.goToPage(this.page);
  }

  goToNextPage() {
    this.page = this.page + 1;
    this.goToPage(this.page);
  }
    
  getMovies(page: number) {
    this.gotError = false;
    this.service.getMoviesList(page).subscribe(
      (res: MovieListResponse) => {
        this.movies = res.results;
        this.total_pages = res.total_pages;
        console.log(res);
        window.scroll(0,0);
        },
      (error) => {
        this.gotError = true;
      });
  }

  getTotal(){
    return new Promise((resolve, reject) => {
      this.service.getMoviesList(1).subscribe(
        (res: MovieListResponse) => {
          this.total_pages = res.total_pages;
          console.log(this.total_pages);
          resolve(this.total_pages);
      })
    })
  }

  refresh() {
    window.location.reload();
  }

  goBack() {
    this.location.back();
  }

  showButton(page:number) {
    return this.page !== page;
  }
}
