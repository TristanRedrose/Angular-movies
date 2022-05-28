import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MovieListResponse, Movie } from 'src/app/models/movie.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private _baseURL: string = "https://api.themoviedb.org/3/movie/top_rated?";
  private _movieUrl:string = "https://api.themoviedb.org/3/movie/"
  private _apiKey: string = environment.API_KEY

  constructor(private http: HttpClient) { }

  getMoviesList(page: number): Observable<MovieListResponse> {
    return this.http.get<MovieListResponse>(`${ this._baseURL }api_key=${ this._apiKey }&page=${page}`);
  }

  getMovie(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(`${ this._movieUrl }${movieId}?api_key=${ this._apiKey }`);
  }
}
 