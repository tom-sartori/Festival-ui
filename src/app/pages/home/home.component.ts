import {Component, OnInit} from '@angular/core';
import {AppSettings, Settings} from 'src/app/app.settings';
import {AppService} from 'src/app/services/app.service';
import {Product, ProductExtended} from 'src/app/app.models';

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
      public appService:AppService
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.getSlides();
    this.getProducts();
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
