import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListSkeletonLoaderComponent } from './movie-list-skeleton-loader.component';

describe('MovieListSkeletonLoaderComponent', () => {
  let component: MovieListSkeletonLoaderComponent;
  let fixture: ComponentFixture<MovieListSkeletonLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieListSkeletonLoaderComponent]
    });
    fixture = TestBed.createComponent(MovieListSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
