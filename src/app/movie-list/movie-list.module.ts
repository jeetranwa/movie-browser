import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieListRoutingModule } from './movie-list-routing.module';
import { MovieHomeComponent } from './movie-home/movie-home.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieListSkeletonLoaderComponent } from './movie-list-skeleton-loader/movie-list-skeleton-loader.component';
import { MovieFiltersComponent } from './movie-filters/movie-filters.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    MovieHomeComponent,
    MovieCardComponent,
    MovieListSkeletonLoaderComponent,
    MovieFiltersComponent
  ],
  imports: [
    CommonModule,
    MovieListRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class MovieListModule { }
