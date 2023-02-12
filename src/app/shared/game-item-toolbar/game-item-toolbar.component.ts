import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GameService } from '@services/game.service';
import { TranslateService } from '@services/translate.service';

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

	public categoryList: string[] = [];

	constructor(public gameService: GameService, public translateService: TranslateService) {
	}

	ngOnInit(): void {
		this.categoryList = this.gameService.getCategoryList();

		this.categoryList.map((category, index) => {
			this.translateService
				.getSyncTranslatedValue('GAME.CATEGORY.' + category)
				.subscribe((translated: string | null) => {
					if (translated) {
						this.categoryList[index] = translated;
					}
				});
		});
	}

	public changeCategory(category: string | null) {
		this.onChangeCategory.emit(category);
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
