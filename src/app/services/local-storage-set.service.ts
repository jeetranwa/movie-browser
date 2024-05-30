import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageSetService {

  constructor() { }

  addMovie(movie: Movie){
    let movies = this.getFavoriteMovies();
    movies.push(movie);
    window.localStorage.setItem('favoriteMovies',JSON.stringify(movies));
  }
  removeMovie(movie: Movie){
    let movies = this.getFavoriteMovies();
    movies = movies.filter(function(item: any) {
      return item.id !== movie.id
    });
    window.localStorage.setItem('favoriteMovies',JSON.stringify(movies));
  }
  getFavoriteMovies(){
    let favoriteMovies = window.localStorage.getItem("favoriteMovies");
    return favoriteMovies?JSON.parse(favoriteMovies):[];
  }
}
