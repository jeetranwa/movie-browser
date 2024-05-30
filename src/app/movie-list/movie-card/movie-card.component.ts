import { DataService } from 'src/app/services/data.service';
import { LocalStorageSetService } from './../../services/local-storage-set.service';
import { TmdbConfigService } from './../../services/tmdb-config.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit{
  @Input() movie!: Movie;
  @Output() favoriteChanged = new EventEmitter<any>();

  imageUrl: string = this.TmdbConfigService.Config.images.base_url;
  isFavorite: boolean = false;
  constructor(
    private TmdbConfigService: TmdbConfigService,
    private LocalStorageSetService: LocalStorageSetService,
    private DataService: DataService
  ){}

  ngOnInit(): void {
    this.isFavorite = this.LocalStorageSetService.getFavoriteMovies().find((item: Movie)=>{
      return item.id == this.movie.id
    })?true:false;
  }
  favorite(movie: Movie, flag: boolean){
    if(flag){
      this.LocalStorageSetService.addMovie(movie);
    }else{
      this.LocalStorageSetService.removeMovie(movie);
    }
    this.isFavorite = flag;
    this.favoriteChanged.emit(flag);
  }

}
