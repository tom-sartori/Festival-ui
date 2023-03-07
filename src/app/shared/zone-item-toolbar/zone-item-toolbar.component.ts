import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-zone-item-toolbar',
  templateUrl: './zone-item-toolbar.component.html',
  styleUrls: ['./zone-item-toolbar.component.scss']
})
export class ZoneItemToolbarComponent implements OnInit {

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onChangeCountPerPage: EventEmitter<number> = new EventEmitter<number>();
  @Output() onChangeViewType: EventEmitter<{ viewType: string; viewCol: number; }>
      = new EventEmitter<{ viewType: string; viewCol: number }>();
  constructor() { }

  ngOnInit(): void {

  }

  public search(value: string) {
    this.onSearch.emit(value);
  }

  public changeCountPerPage(countPerPage: number) {
    this.onChangeCountPerPage.emit(countPerPage);
  }

  public changeViewType({ viewType, viewCol }: { viewType: string; viewCol: number }) {
    this.onChangeViewType.emit({ viewType, viewCol });
  }

}
