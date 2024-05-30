import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _getSearchText$ = new BehaviorSubject<any>(0);
  private _getNavigation$ = new BehaviorSubject<any>('home');

  public set updateSearchText(resetStatus: any) {
    this._getSearchText$.next(resetStatus);
  }

  public get getSearchText(): Observable<any> {
    return this._getSearchText$.asObservable();
  }

  public set updateNavigation(resetStatus: any) {
    this._getNavigation$.next(resetStatus);
  }

  public get getNavigation(): Observable<any> {
    return this._getNavigation$.asObservable();
  }
}
