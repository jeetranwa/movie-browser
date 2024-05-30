import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent {
  searchText: string = '';

  constructor(private dataService: DataService){}
  searchMovie(){
    this.dataService.updateSearchText = this.searchText;
  }
}
