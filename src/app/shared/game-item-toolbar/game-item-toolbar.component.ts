import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GameService } from '@services/game.service';
import { Category } from '@models/shared/category.model';

@Component({
	selector: 'app-game-item-toolbar',
	templateUrl: './game-item-toolbar.component.html',
	styleUrls: ['./game-item-toolbar.component.scss']
})
export class GameItemToolbarComponent implements OnInit {
	@Output() onChangeCategory: EventEmitter<string | null> = new EventEmitter<string | null>();
	@Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
	@Output() onChangeCountPerPage: EventEmitter<number> = new EventEmitter<number>();
	@Output() onChangeViewType: EventEmitter<{ viewType: string; viewCol: number; }>
		= new EventEmitter<{ viewType: string; viewCol: number }>();

	public categoryList: Category[] = [];

	constructor(
		public gameService: GameService
	) {
	}

	ngOnInit(): void {
		this.categoryList = this.gameService.getCategoryList();
		this.categoryList.unshift(new Category(null, 'GAME.CATEGORY.ALL'));
	}

	public changeCategory(category: Category) {
		this.onChangeCategory.emit(category.value);
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
