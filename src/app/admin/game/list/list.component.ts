import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { GameService } from 'src/app/services/game.service';
import { Game } from '@models/game.model';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogService } from '@services/dialog.service';
import { TranslateService } from '@services/translate.service';
import { SnackBarService } from '@services/snack-bar.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	displayedColumns: string[] = ['name', 'type', 'action'];
	dataSource!: MatTableDataSource<Game>;
	@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort!: MatSort;

	public gameList: Game[] = [];

	constructor(
		public translateService: TranslateService,
		public gameService: GameService,
		public snackBarService: SnackBarService,
		public dialogService: DialogService
	) {}

	ngOnInit(): void {
		this.getGameList();
	}

	public getGameList(): void {
		this.gameService.get().subscribe({
			next: (response: Game[]) => {
				this.gameList = response;
				this.initDataSource();
			},
			error: (error) => {
				this.snackBarService.openError(error);
			}
		});
	}

	public initDataSource() {
		this.dataSource = new MatTableDataSource(this.gameList);
		this.dataSource.paginator = this.paginator;

		this.dataSource.sortingDataAccessor = (
			data: any,
			sortHeaderId: string
		): string => {
			return typeof data[sortHeaderId] === 'string'
				? data[sortHeaderId].toLocaleLowerCase()
				: data[sortHeaderId];
		};

		this.dataSource.sort = this.sort;

		const sortState: Sort = { active: 'name', direction: 'asc' };
		this.sort.active = sortState.active;
		this.sort.direction = sortState.direction;
		this.sort.sortChange.emit(sortState);
	}

	public delete(gameId: string) {
		const message = this.translateService.getTranslatedValue(
			'MESSAGE.SURE_DELETE'
		);
		let dialogRef = this.dialogService.openConfirmDialog('', message!);
		dialogRef.afterClosed().subscribe((dialogResult) => {
			if (dialogResult) {
				// Delete element.
				this.gameService.deleteGame(gameId).subscribe({
					next: () => {
						// Deleted.
						this.snackBarService.openSuccess(
							this.translateService.getTranslatedValue(
								'SNACKBAR.DELETED'
							)!
						);
						this.getGameList();
					},
					error: (error) => {
						console.log(error);
						this.snackBarService.openError(
							this.translateService.getTranslatedValue(
								'SNACKBAR.ERROR'
							)!
						);
					}
				});
			}
		});
	}

	public openDialog(game: Game | null) {
		this.dialogService
			.openDialog(DialogComponent, game)
			.afterClosed()
			.subscribe(() => this.getGameList());
	}
}
