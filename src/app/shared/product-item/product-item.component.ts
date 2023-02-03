import {Component, Input, OnInit, SimpleChange} from '@angular/core';
import {ProductExtended} from 'src/app/app.models';
import {AppService} from 'src/app/services/app.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() productExtended!: ProductExtended;
  @Input() lazyLoad: boolean = false;
  @Input() viewType: string = "grid";
  @Input() viewColChanged: any;
  public column:number = 4;

  constructor(
      public appService:AppService
  ) { }

  ngOnInit(): void {
    this.getNameList();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    if(changes.viewColChanged){
      this.getColumnCount(changes.viewColChanged.currentValue);
    }
  }

  public getColumnCount(value: number) {
    if(value == 25){
      this.column = 4;
    }
    else if(value == 33.3){
      this.column = 3;
    }
    else if(value == 50){
      this.column = 2
    }
    else{
      this.column = 1;
    }
  }

  private getNameList() {
    this.appService.getNames().subscribe( nameList => {
      this.appService.Data.names = nameList;
    })
  }
}
