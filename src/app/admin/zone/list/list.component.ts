import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Zone } from '@models/zone.model';
import { TranslateService } from '@services/translate.service';
import { DialogService } from '@services/dialog.service';
import { SnackBarService } from '@services/snack-bar.service';
import { ZoneService } from '@services/zone.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	displayedColumns: string[] = ['name', 'action'];
	dataSource!: MatTableDataSource<Zone>;
	@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort!: MatSort;

	public zoneList: Zone[] = [];
	public message: string | null = null;

	constructor(
		public translateService: TranslateService,
		public zoneService: ZoneService,
		public snackBarService: SnackBarService,
		public dialogService: DialogService,
		public router: Router
	) {
	}

	ngOnInit(): void {
		this.getZoneList();
	}


	public getZoneList(): void {
		this.zoneService.get().subscribe({
			next: (response: Zone[]) => {
				this.zoneList = response;
				if (this.zoneList.length > 0) {
					this.message = null;
					this.initDataSource();
				}
				else {
					this.message = this.translateService.getTranslatedValue('ZONE.NO_DATA');
				}
			},
			error: (error) => {
				this.snackBarService.openError(error);
			}
		});
	}

	public initDataSource() {
		this.dataSource = new MatTableDataSource(this.zoneList);
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

	public delete(zoneId: string) {
		const message = this.translateService.getTranslatedValue(
			'MESSAGE.SURE_DELETE'
		);
		let dialogRef = this.dialogService.openConfirmDialog('', message!);
		dialogRef.afterClosed().subscribe((dialogResult) => {
			if (dialogResult) {
				// Delete element.
				this.zoneService.delete(zoneId).subscribe({
					next: () => {
						// Deleted.
						this.snackBarService.openSuccess(
							this.translateService.getTranslatedValue(
								'SNACKBAR.DELETED'
							)!
						);
						this.getZoneList();
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

	public onAdd() {
		this.router.navigate(['/admin/zone/add']).then();
	}

	public onUpdate(id: string) {
		this.router.navigate(['/admin/zone/update', id]).then();
	}
}
