import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-product-item-toolbar',
  templateUrl: './product-item-toolbar.component.html',
  styleUrls: ['./product-item-toolbar.component.scss']
})
export class ProductItemToolbarComponent implements OnInit {
  @Input() showSidenavToggle:boolean = false;
  @Output() onSidenavToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangeCount: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangeSorting: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangeViewType: EventEmitter<any> = new EventEmitter<any>();
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public counts = [8, 12, 16, 24, 36];
  public count:any;
  public sortList = ['DEFAULT', 'POPULAR', 'PRICE_LTH', 'PRICE_HTL'];
  public sort:any;

  constructor() { }

  ngOnInit(): void {
    this.count = this.counts[1];
    this.sort = this.sortList[0];
  }

  ngOnChanges(){
    // console.log(' show toggle - ' ,this.showSidenavToggle)
  }

  public changeCount(count: number){
    this.count = count;
    this.onChangeCount.emit(count);
    // this.getAllProducts();
  }

  public changeSorting(sort: string){
    this.sort = sort;
    this.onChangeSorting.emit(sort);
  }

  public changeViewType(viewType: any, viewCol: any){
    this.viewType = viewType;
    this.viewCol = viewCol;
    this.onChangeViewType.emit({
      viewType: viewType,
      viewCol: viewCol
    });
  }

  public sidenavToggle(){
    this.onSidenavToggle.emit();
  }
}
