import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http:HttpClient) { }

  getData() {
    let url ="https://api.themoviedb.org/3/movie/top_rated?";
    return this.http.get(url);
  }
}
