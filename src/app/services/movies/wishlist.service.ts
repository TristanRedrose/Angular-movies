import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiResponse, WishlistResponse } from "src/app/models/response.types";
import { Observable, map } from "rxjs";
import { Movie } from "src/app/models/movie.types";
import { MoviesService } from 'src/app/services/movies/movies.service';

@Injectable ({
 providedIn: 'root'
})

export class WishlistService {

    private _key: string = 'Token';
    private _token: string | null
    private _myWishlist: Movie[] = [];

    constructor(private http: HttpClient, private moviesService: MoviesService) {
      this.initWishlist();
    }

    addWish(movie_id: number): Observable <ApiResponse> {
      this._token = localStorage.getItem(this._key);
      const header = new  HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token}`
      });
      const movie = {
        movie_id: movie_id
      }

      return this.http.post<ApiResponse>('http://localhost:3000/api/movies/addWish', movie, {headers: header});
    };

    removeWish(movie_id: number ){
      this._token = localStorage.getItem(this._key);
      const header = new  HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token}`
      });
      const movie = {
        movie_id: movie_id
      }

      return this.http.post<ApiResponse>('http://localhost:3000/api/movies/removeWish', movie, {headers: header});
    };

    returnWishlist(): Observable <WishlistResponse[]> {
      this._token = localStorage.getItem(this._key);
      const header = new  HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token}`
      });

      return this.http.get<WishlistResponse[]>('http://localhost:3000/api/movies/returnWishlist', {headers: header});
    };

    initWishlist(): void {
      let wishlist: WishlistResponse[];
      this.returnWishlist().subscribe(res => {
        wishlist = res;
        for (let i = 0; i < wishlist.length; i++) {
          this.moviesService.getMovie(wishlist[i].movie_id).subscribe(res => {
            this._myWishlist.push(res);
            console.log(res.original_title);
          });
        }
      });
    }

    get myWishlist(): Movie[] {
      return this._myWishlist;
    }

    addMovieWish(movie_id: number): void {
      this.moviesService.getMovie(movie_id).subscribe(res => {
        this._myWishlist.push(res);
        console.log(res.original_title);
      });
    }

    removeMovieWish(movie_id: number): void {
      this._myWishlist = this._myWishlist.filter(movie => movie.id !== movie_id);
    }

    isWishlisted(movie_id: number): boolean {
      return this.myWishlist.length 
        ? this._myWishlist.findIndex(movie => movie.id === movie_id) > 0
        : false;
    }
}