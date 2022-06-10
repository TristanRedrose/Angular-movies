import { Component, OnInit } from '@angular/core';
import { MoviesService } from "../../services/movies/movies.service";
import { Movie, MovieListResponse } from "../../models/movie.types";
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import { Location } from '@angular/common';
import { WishlistService } from 'src/app/services/movies/wishlist.service';


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
  showLoading: boolean;

  constructor(private service: MoviesService, private router: Router, private route: ActivatedRoute, private location: Location, private wishlistService: WishlistService) { 
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    })
  }

  ngOnInit(): void {
    this.getPage();
  }

  goToPage(page: number) {
    console.log(`Navigating to page ${page}`);
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

  getPage() {
    if (this.total_pages === undefined) {
      this.service.getMoviesList(1).subscribe(
        (res: MovieListResponse) => {
          this.total_pages = res.total_pages;
          console.log(this.total_pages);
          this.getParam();
      })
    }
    else {
      this.getParam();
    }
  }

  getParam() {
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

  refresh() {
    window.location.reload();
  }

  goBack() {
    this.location.back();
  }

  showButton(page:number) {
    return this.page !== page;
  }

  async navigationInterceptor(event: RouterEvent) {
    if (event instanceof NavigationStart || event instanceof NavigationEnd) {
      this.showLoading = true;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError
      ) {
      this.showLoading = false;
    }
  }

  addWish(movie: Movie): void {
    this.wishlistService.addWish(movie);
  }

  removeWish(id: number): void {
    this.wishlistService.removeWish(id);
  }

  isWishlisted(movie: Movie): boolean {
    return this.wishlistService.isWishlisted(movie);
  }
}
