import {Component, Input, OnInit} from '@angular/core';
import {ProductExtended} from 'src/app/app.models';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-product-item-carousel',
  templateUrl: './product-item-carousel.component.html',
  styleUrls: ['./product-item-carousel.component.scss']
})
export class ProductItemCarouselComponent implements OnInit {
  @Input('productList') productList: Array<ProductExtended> = [];
  public config: SwiperConfigInterface = {};

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.config = {
      observer: true,
      slidesPerView: 4,
      spaceBetween: 16,
      keyboard: true,
      navigation: { nextEl: '.prop-next', prevEl: '.prop-prev'},
      pagination: true,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        280: {
          slidesPerView: 1
        },
        600: {
          slidesPerView: 2
        },
        960: {
          slidesPerView: 3
        },
        1280: {
          slidesPerView: 4
        }
      }
    }
  }
}
