import { TmdbApiService } from 'src/app/services/tmdb-api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TmdbConfig } from '../models/tmdb-config.model';

@Injectable({
  providedIn: 'root'
})
export class TmdbConfigService {
  Config!: TmdbConfig;

  constructor(private TmdbApiService:TmdbApiService) {}

  init(){
    return this.TmdbApiService.configuration().pipe(
      map((config) => {
        this.Config = config;
      })
    );
  }
}
