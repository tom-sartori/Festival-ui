import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-category-toggle[categoryList]',
  templateUrl: './category-toggle.component.html',
  styleUrls: ['./category-toggle.component.scss']
})
export class CategoryToggleComponent implements OnInit {
  @Input() categoryList!: string[]; // This is the list of categories. Elements should already be translated.

  @Output() onChangeCategory: EventEmitter<string | null> = new EventEmitter<string | null>();

  public selectedCategory: string | null = null;

  constructor() { }

  ngOnInit(): void { }

  public handlerOnChangeCategory(category: string | null){
    this.selectedCategory = category;
    this.onChangeCategory.emit(this.selectedCategory);
  }
}
