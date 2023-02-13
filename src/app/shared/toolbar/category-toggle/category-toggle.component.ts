import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '@models/shared/category.model';

@Component({
	selector: 'app-category-toggle[categoryList]',
	templateUrl: './category-toggle.component.html',
	styleUrls: ['./category-toggle.component.scss']
})
export class CategoryToggleComponent implements OnInit {
	@Input() categoryList!: Category[];

	@Output() onChangeCategory: EventEmitter<Category> = new EventEmitter<Category>();

	public selectedCategory: Category | null = null;

	constructor() {
	}

	ngOnInit(): void {
		this.selectedCategory = this.categoryList[0];
	}

	public handlerOnChangeCategory(category: Category) {
		this.selectedCategory = category;
		this.onChangeCategory.emit(this.selectedCategory);
	}
}
