import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private dataService: DataService){}
  path: string = 'home';
  navigate(path: string){
    this.path = path;
    this.dataService.updateNavigation = path;
  }
}
