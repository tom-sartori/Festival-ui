import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-view-type',
  templateUrl: './view-type.component.html',
  styleUrls: ['./view-type.component.scss']
})
export class ViewTypeComponent implements OnInit {
  @Output() onChangeViewType: EventEmitter< { viewType: string, viewCol: number } > = new EventEmitter< { viewType: string, viewCol: number } >();

  public viewType: string = 'grid';
  public viewCol: number = 25;

  constructor() { }

  ngOnInit(): void { }

  public changeViewType(viewType: string, viewCol: number){
    this.viewType = viewType;
    this.viewCol = viewCol;
    this.onChangeViewType.emit( { viewType, viewCol } );
  }
}
