import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from 'src/app/services/app.service';
import {Category, Pagination, Product, ProductExtended} from 'src/app/app.models';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  // Data.
  public productList: ProductExtended[] = [];
  public categoryList: Category[] = [];

  // Selection.
  public selectedCategoryId: string | null = null;

  // Sort and pagination.
  public sort: string = '';
  public count: number = 12;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public pagination: Pagination = new Pagination(1, this.count, null, 2, 0, 0);
  public viewType: string = 'grid';
  public viewCol: number = 25;

  // Sidenav.
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen: boolean = false;
  public showSidenavToggle: boolean = false;
  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation:true
  };

  // Others.
  public message: string | null = '';


  constructor(
      public appService: AppService
  ) { }

  ngOnInit(): void {
    this.getCategoryList();
    this.getProductList();
  }


  public selectCategory(categoryId: string | null){
    this.selectedCategoryId = categoryId;
    this.resetProductList();
    this.resetPagination();
    this.getProductList();
    this.sidenav.close();
  }


  // Filter data.
  public filterData(data: ProductExtended[]){
    return this.appService.filterData(data, this.selectedCategoryId, this.sort, this.pagination.page, this.pagination.perPage);
  }

  public getProductList() {
    this.appService.getProducts().subscribe(productList => {
      // this.appService.Data.products = productList;
      // this.productList = this.appService.Data.products;
      let productExtendedList: ProductExtended[] = [];
      productList.forEach((product: Product) => productExtendedList.push(new ProductExtended(product)));
      let result = this.filterData(productExtendedList);

      if (result.data.length === 0) {
        this.resetProductList();
        this.pagination = new Pagination(1, this.count, null, 2, 0, 0);
        this.message = this.appService.getTranslateValue('PRODUCT.NO_DATA');
      }
      else {
        this.productList = result.data;
        this.pagination = result.pagination;
        this.message = null;
      }
    });
  }

  public getCategoryList() {
    this.appService.getCategories().subscribe(categoryList => {
      this.appService.Data.categories = categoryList;
      this.categoryList = this.appService.Data.categories;
    });
  }

  // Reset.
  private resetProductList() {
    this.productList.length = 0;
  }

  public resetPagination(){
    if(this.paginator){
      this.paginator.pageIndex = 0;
    }
    this.pagination = new Pagination(1, this.count, null, null, this.pagination.total, this.pagination.totalPages);
  }

  // Handlers.
  public handlerOnChangeCategory(event: any){
    this.selectCategory(event.value);
  }

  public handlerOnChangeCount(count: number){
    this.count = count;
    this.resetProductList();
    this.resetPagination();
    this.getProductList();
  }

  public handlerOnChangeSorting(event: any){
    this.sort = event;
    this.resetProductList();
    this.getProductList();
  }

  public handlerOnChangeViewType(event: any){
    this.viewType = event.viewType;
    this.viewCol = event.viewCol;
  }

  public handlerOnPageChange(event: any){
    this.pagination.page = event.pageIndex + 1;
    this.getProductList();
    window.scrollTo(0,0);
  }
}
