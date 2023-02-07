import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  public isSearchBarToggled: boolean = false;
  public searchBarValue: string = '';

  private timeoutId: any;

  constructor() { }

  ngOnInit(): void { }

  public search() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.onSearch.emit(this.searchBarValue);
    }, 200);
  }

  public toggleSearchBar(): void {
    this.isSearchBarToggled = !this.isSearchBarToggled;
    if (!this.isSearchBarToggled) {
      this.searchBarValue = '';
      this.search();
    }
  }
}
