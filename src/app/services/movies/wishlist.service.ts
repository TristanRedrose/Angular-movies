import { Injectable } from "@angular/core";
import { Movie } from "src/app/models/movie.types";

@Injectable ({
 providedIn: 'root'
})

export class WishlistService {
    private _key: string = "MyWishlist";
    private _myWishlist: Movie[];

    constructor() {
      this.initWishlist();
    }

    get myWishlist() : Movie[] {
      return this._myWishlist;
    }
    
    initWishlist(): void {
      if (JSON.parse(localStorage.getItem(this._key)) != null){
        this._myWishlist = JSON.parse(localStorage.getItem(this._key));
      }
      else {
        this._myWishlist = [];
      }
      console.log(this.myWishlist);
    }

    addWish(movie: Movie): void {
      this._myWishlist.push(movie);
      localStorage.setItem(this._key, JSON.stringify(this._myWishlist));
      console.log(this._myWishlist);
    }

    removeWish(id: number): void {
      this._myWishlist = this.myWishlist.filter(item => item.id !== id);
      localStorage.setItem(this._key, JSON.stringify(this._myWishlist));
      console.log(this._myWishlist);
    }

    isWishlisted(movie: Movie): boolean {
      //return this.myWishlist.includes(movie);

      return this._myWishlist.find(item => item.id === movie.id) !== undefined;
    }
}