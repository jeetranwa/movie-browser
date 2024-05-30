import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TmdbConfig } from '../models/tmdb-config.model';
import { MovieList } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {

  headers = new HttpHeaders({
    accept: 'application/json',
    Authorization: environment.token
  });
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  configuration():Observable<TmdbConfig>{
    return this.http.get<TmdbConfig>(this.apiUrl+'configuration',{ headers: this.headers });
  }

  discoverMovie(params:any = {}):Observable<MovieList>{
    return this.http.get<MovieList>(this.apiUrl+'discover/movie',{ params: params, headers: this.headers });
  }

  movieSearch(params:any = {}):Observable<MovieList>{
    return this.http.get<MovieList>(this.apiUrl+'search/movie',{ params: params, headers: this.headers });
  }

  genres():Observable<any>{
    return this.http.get<any>(this.apiUrl+'genre/movie/list',{ headers: this.headers });
  }
}
