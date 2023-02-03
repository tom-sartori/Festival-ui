import {Component, OnInit} from '@angular/core';
import {ProductExtended} from 'src/app/app.models';
import {AppSettings, Settings} from 'src/app/app.settings';
import {AppService} from 'src/app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  private sub: any;
  public productExtended!: ProductExtended;
  public settings: Settings;
  public quantityCount: number = 1;
  public relatedProductList: Array<ProductExtended> = [];

  constructor(
      public appSettings:AppSettings,
      public appService:AppService,
      private activatedRoute: ActivatedRoute,
      public fb: UntypedFormBuilder,
      public snackBar: MatSnackBar
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.getProduct(params['id']);
    });
    this.getRelatedMenuItems();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public getProduct(id: string) {
    this.appService.getProduct(id).subscribe(product => {
      product = this.appService.wrapProduct(product);
      this.productExtended = new ProductExtended(product)
    });
  }

  public counterChange(count:number){
    this.quantityCount = count;
  }

  public addToCart(){
    this.productExtended.cartCount = this.quantityCount;
    if(this.productExtended.cartCount <= this.productExtended.availibilityCount){
      const index: number = this.appService.Data.cartList.findIndex(item => item.id == this.productExtended.id);
      (index !== -1) ? this.appService.Data.cartList[index] = this.productExtended : this.appService.addToCart(this.productExtended, null);
      this.appService.calculateCartTotal();
    }
    else{
      this.productExtended.cartCount = this.productExtended.availibilityCount;

      this.snackBar.open(
          this.appService.getTranslateValue('SNACKBAR.CART.CAN_NOT_ADD', this.productExtended.availibilityCount.toString())!,
          '×',
          { panelClass: 'error', verticalPosition: 'top', duration: 5000 }
      );
    }
  }

  public addToFavorites() {
    this.appService.addToFavorites(this.productExtended.product);
  }

  public getRelatedMenuItems(){
    this.appService.getProducts().subscribe(productList => {
      this.relatedProductList = this.appService.shuffleArray(productList).slice(0, 8);
    });
  }
}
