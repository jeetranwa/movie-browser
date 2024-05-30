import { TmdbConfigService } from './services/tmdb-config.service';
import { TmdbApiService } from 'src/app/services/tmdb-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'movie-browser';
  constructor(private TmdbApiService: TmdbApiService, private TmdbConfigService: TmdbConfigService){}
  ngOnInit(): void {
  }

}
