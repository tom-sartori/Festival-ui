import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/services/app.service';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.scss']
})
export class ChefsComponent implements OnInit {
  public chefs:any;
  constructor(public appService:AppService) { }

  ngOnInit() {
    this.chefs = this.appService.getChefs();
    this.getMenuItems();
  }

  public getMenuItems(){
  }
}
