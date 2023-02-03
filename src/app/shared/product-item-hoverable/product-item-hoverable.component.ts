import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../app.models';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-product-item-hoverable',
  templateUrl: './product-item-hoverable.component.html',
  styleUrls: ['./product-item-hoverable.component.scss']
})
export class ProductItemHoverableComponent implements OnInit {
  @Input() product!: Product;
  @Input() onlyImage: boolean = false;

  constructor(
      public appService: AppService
  ) { }

  ngOnInit(): void {
  }

  public addToCart(){
    throw Error('Not implemented yet. ');
    // this.appService.addToCart(this.product, CartOverviewComponent);
  }

  public onCart(): boolean {
    /// TODO : Not implemented yet.
    return false
    // if(this.appService.Data.cartList.find(item => item.id == this.product.id)){
    //   return true;
    // }
    // return false;
  }

  public addToFavorites(){
    throw Error('Not implemented yet. ');
    // this.appService.addToFavorites(this.product);
  }

  public onFavorites(): boolean {
    /// TODO : Not implemented yet.
    return false
    // if(this.appService.Data.favorites.find(item => item.id == this.product.id)){
    //   return true;
    // }
    // return false;
  }
}
