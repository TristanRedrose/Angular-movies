import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MoviesService } from "../../services/movies/movies.service";
import { Movie } from "../../models/movie.types";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "app-movie",
    templateUrl: "./movie.component.html",
    styleUrls: ["./movie.component.css"]
})

export class MovieComponent {
    pathUrl: string;
    movieId: number;
    movie: Movie;
    isLoaded: boolean = false;

    constructor(private router: Router, private service: MoviesService, private title: Title) {
        this.pathUrl = router.url
        this.movieId = +(this.pathUrl.substr(this.pathUrl.length - (this.pathUrl.length - 8)))
    }

    ngOnInit(): void {
        this.getMovie(this.movieId);
      }

    getMovie(id: number) {
        this.service.getMovie(id).subscribe((res: Movie) => {
            this.movie = res;
            console.log(res);
            this.isLoaded = true;
            this.title.setTitle(this.movie.title)
        })
    }
};

