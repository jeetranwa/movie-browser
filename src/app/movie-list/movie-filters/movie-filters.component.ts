import { TmdbApiService } from 'src/app/services/tmdb-api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Filters } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-filters',
  templateUrl: './movie-filters.component.html',
  styleUrls: ['./movie-filters.component.scss']
})
export class MovieFiltersComponent implements OnInit {

  @Output() onApplyFilter = new EventEmitter<any>();

  genres!: any;
  filters: Filters = {
    genre: '',
    releaseDate: {
      from: '',
      to: ''
    },
    rating: {
      from: '',
      to: ''
    }
  }

  constructor(
    private TmdbApiService: TmdbApiService,
    private notifier: NotifierService
  ){
  }

  ngOnInit(): void {
    this.TmdbApiService.genres().subscribe(result=>{
      this.genres = result.genres;
    });
  }

  notify(msg:string){
    this.notifier.notify('error', msg);
  }

  applyFilter(){
    let isValidFilters = false;
    let finalFilters: any = {};
    if(this.filters.genre && this.filters.genre.trim() != ''){
      finalFilters['with_genres'] = this.filters.genre;
      isValidFilters = true;
    }
    if(this.filters.releaseDate.from && this.filters.releaseDate.from != ''){
      if(this.yearValidation(this.filters.releaseDate.from)){
        finalFilters['primary_release_date.gte'] = this.filters.releaseDate.from + '-01-01';
        isValidFilters = true;
      }else{
        isValidFilters = false;
      }
    }
    if(this.filters.releaseDate.to && this.filters.releaseDate.to != ''){
      if(this.yearValidation(this.filters.releaseDate.to)){
        finalFilters['primary_release_date.lte'] = this.filters.releaseDate.to + '-12-31';
        isValidFilters = true;
      }else{
        isValidFilters = false;
      }
    }
    if(this.filters.rating.from && this.filters.rating.from != ''){
      if(this.ratingValidation(this.filters.rating.from)){
        finalFilters['vote_average.gte'] = this.filters.rating.from;
        isValidFilters = true;
      }else{
        isValidFilters = false;
      }
    }
    if(this.filters.rating.to && this.filters.rating.to != ''){
      if(this.ratingValidation(this.filters.rating.to)){
        finalFilters['vote_average.lte'] = this.filters.rating.to;
        isValidFilters = true;
      }else{
        isValidFilters = false;
      }
    }
    if(isValidFilters){
      this.onApplyFilter.emit(finalFilters);
    }else{
      this.onApplyFilter.emit(null);
    }
  }

  ratingValidation(rating:any) {
    rating = parseInt(rating, 10);
    if(rating >= 1 && rating <=10){
      return true;
    }else{
      this.notify("Rating should be in range 0 to 10");
      return false;
    }
  }

  yearValidation(year:any) {
    var text = /^[0-9]+$/;
    if(year.length==4) {
      if (year != 0) {
          if ((year != "") && (!text.test(year))) {
              this.notify("Please Enter Numeric Values Only");
              return false;
          }
          return true;
      }
    }
    this.notify("Year is not proper. Please check");
    return false;
  }
}
