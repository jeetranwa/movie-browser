import { LocalStorageSetService } from './../../services/local-storage-set.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { DataService } from 'src/app/services/data.service';
import { TmdbApiService } from 'src/app/services/tmdb-api.service';

@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.scss']
})
export class MovieHomeComponent implements OnInit{
  movieList!: Movie[];
  totalPages: number = 0;
  loading: boolean = true;
  options: any = {
    page: 1,
    searchText: ''
  };
  filters: any = null;
  path: string = 'home';

  constructor(
    private TmdbApiService: TmdbApiService,
    private dataService: DataService,
    private LocalStorageSetService: LocalStorageSetService
  ){}

  ngOnInit(): void {
    // this.fetchMovies();
    this.dataService.getSearchText.subscribe((searchText) => {
      if(searchText){
        this.options.searchText = searchText.toString().trim().split(" ").join('|');
        this.options.page = 1;
        this.fetchMovies();
      }
    });
    this.dataService.getNavigation.subscribe((path) => {
      this.path = path;
      if(path == 'favorite'){
        this.options = {
          page: 1,
          searchText: ''
        };
        this.filters = null;
        this.movieList = this.LocalStorageSetService.getFavoriteMovies();
      }else if(path == 'home'){
        this.options = {
          page: 1,
          searchText: ''
        };
        this.filters = null;
        this.fetchMovies();
      }
    });
  }
  favoriteChanged(favorite: boolean){
    if(this.path == 'favorite'){
      this.options = {
        page: 1,
        searchText: ''
      };
      this.filters = null;
      this.movieList = this.LocalStorageSetService.getFavoriteMovies();
    }
  }
  ApplyFilters(filters: any){
    if(JSON.stringify(this.filters) != JSON.stringify(filters)){
      this.options = {
        page: 1,
        searchText: ''
      };
      this.filters = filters;
      this.fetchMovies();
    }
  }
  fetchMovies(){
    window.scroll(0,0);
    this.loading = true;
    if(this.options.searchText){
      this.TmdbApiService.movieSearch({page: this.options.page, query: this.options.searchText}).subscribe(result=>{
        this.asignValues(result);
      });
    }else{
      let apiArgs: any = {
        page: this.options.page
      };
      if(this.filters){
        Object.assign(apiArgs, this.filters);
      }
      this.TmdbApiService.discoverMovie(apiArgs).subscribe(result=>{
        this.asignValues(result);
      });
    }
  }
  asignValues(result: any){
    this.movieList = result.results;
    this.options.page = result.page;
    this.totalPages = result.total_pages;
    setTimeout(()=>this.loading = false,1000);
  }
  changePage(inc:number = 0){
    this.options.page += inc;
    if(this.options.page >0 && this.options.page<=this.totalPages){
      this.fetchMovies();
    }
  }
}
