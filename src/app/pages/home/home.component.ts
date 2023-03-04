import { Component, OnInit } from '@angular/core';
import { AppSettings, Settings } from 'src/app/app.settings';
import { AppService } from 'src/app/services/app.service';
import { ProductExtended } from 'src/app/app.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public slides = [];
  public specialProductList:Array<ProductExtended> = [];
  public bestProductList:Array<ProductExtended> = [];

  public settings: Settings;
  constructor(
      public appSettings:AppSettings,
      public appService:AppService,
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
  }

}
