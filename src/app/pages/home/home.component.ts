import {Component, OnInit} from '@angular/core';
import {AppSettings, Settings} from 'src/app/app.settings';
import {AppService} from 'src/app/services/app.service';
import {Product, ProductExtended} from 'src/app/app.models';
import {GameService} from "../../services/game.service";
import {VolunteerService} from "../../services/volunteer.service";
import {ZoneService} from "../../services/zone.service";
import {Game} from "../../models/game.model";
import {Volunteer} from "../../models/volunteer.model";
import {Zone} from "../../models/zone.model";
import {Slot} from "../../models/slot.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public slides = [];
  public specialProductList:Array<ProductExtended> = [];
  public bestProductList:Array<ProductExtended> = [];
  public productToday!: ProductExtended;

  public settings: Settings;
  constructor(
      public appSettings:AppSettings,
      public appService:AppService,
      public gameService: GameService,
      public volunteerService : VolunteerService,
      public zoneService : ZoneService
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    let tab = [""]
    let slot = new Slot("Feb 6, 2023, 6:48:21 PM", "Feb 6, 2023, 9:48:21 PM", [''])
    let slots = [slot]
    let newZone = new Zone("11111", "nvl zone", tab, slots)

    this.getSlides();
    this.getProducts();

      this.zoneService.createZone(newZone).subscribe(res => {
        console.log(res);
      });

    //this.zoneService.getById("63dd200c41949d57f27ea7a0").subscribe(zone => console.log(zone))
    //this.zoneService.get().subscribe(zone => console.log(zone))
    //this.volunteerService.get().subscribe(volunteer => console.log(volunteer))
    //this.volunteerService.getById("63dd200b41949d57f27ea786").subscribe(volunteer => console.log(volunteer))
    //this.gameService.get().subscribe(game => console.log(game))
    //console.log("le jeu seul :")
    //this.gameService.getById("63dd200c41949d57f27ea78c").subscribe(game => console.log("le jeu", game));


  }

  public getSlides(){
    this.appService.getHomeCarouselSlides().subscribe((res:any)=>{
      this.slides = res;
    });
  }

  public getProducts() {
    this.appService.getProducts().subscribe(products => {
      this.appService.Data.products = products;

      this.appService.Data.products.forEach( (product: Product) => this.appService.wrapProduct(product));

      this.appService.Data.products.forEach((product: Product) => {
        this.specialProductList.push(new ProductExtended(product));
        this.bestProductList.push(new ProductExtended(product));
      });
      this.productToday = new ProductExtended(this.appService.Data.products[0]);
    });
  }
}
