import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination-select',
  templateUrl: './pagination-select.component.html',
  styleUrls: ['./pagination-select.component.scss']
})
export class PaginationSelectComponent implements OnInit {
  @Input() public countPerPageList: number[] = [8, 12, 16, 24, 36];
  @Input() public countPerPage: number = this.countPerPageList[1]

  @Output() onChangeCountPerPage: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.onChangeCountPerPage.emit(this.countPerPage);
  }

  public changePerPage(countPerPage: number){
    this.countPerPage = countPerPage;
    this.onChangeCountPerPage.emit(countPerPage);
  }
}
