import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Slot } from '@models/slot.model';
import { SlotDialogComponent } from '@admin/zone/slot/slot-dialog/slot-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings } from '@app/app.settings';
import { VolunteerService } from '@services/volunteer.service';
import { Volunteer } from '@models/volunteer.model';
import { forEach, isEqual } from 'lodash';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-slot-list[slotList]',
	templateUrl: './slot-list.component.html',
	styleUrls: ['./slot-list.component.scss']
})
export class SlotListComponent implements OnInit, OnChanges {
	@Input() slotList: Slot[] = [];

	@Output() onUpdateSlotDialog: EventEmitter<Slot[]> = new EventEmitter<Slot[]>();

	displayedColumns: string[] = ['startDate', 'endDate', 'volunteerRefs', 'action'];
	dataSource!: MatTableDataSource<Slot>;
	@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort!: MatSort;

	public volunteerList: Volunteer[] = [];

	constructor(
		public dialog: MatDialog,
		public appSettings: AppSettings,
		public volunteerService: VolunteerService,
		public datePipe: DatePipe
	) {
	}

	public ngOnInit() {
		this.getVolunteerList();
	}

	ngOnChanges(): void {
		if (this.slotList.length > 0) {
			this.initDataSource();
		}
	}

	public initDataSource() {
		this.onUpdateSlotDialog.emit(this.slotList);

		this.dataSource = new MatTableDataSource(this.slotList);
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

		const sortState: Sort = { active: 'startDate', direction: 'asc' };
		this.sort.active = sortState.active;
		this.sort.direction = sortState.direction;
		this.sort.sortChange.emit(sortState);
	}

	public openDialog(slot: Slot | null) {
		this.dialog
			.open(SlotDialogComponent, {
				data: slot,
				panelClass: 'theme-dialog',
				autoFocus: false,
				direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr'
			})
			.componentInstance
			.onSubmitSlotDialog
			.subscribe((newSlot: Slot) => {
				if (slot) {
					forEach(this.slotList, (s: Slot, index: number) => {
						if (isEqual(slot, s)) {
							// Replace the old slot with the new one
							this.slotList[index] = newSlot;
						}
					});
				}
				else {
					this.slotList.push(newSlot);
				}

				this.getVolunteerList();
				this.initDataSource();
			});
	}

	public delete(slot: Slot) {
		forEach(this.slotList, (s: Slot, index: number) => {
			if (isEqual(slot, s)) {
				// Remove the slot
				this.slotList.splice(index, 1);
				this.initDataSource();
			}
		});
	}

	public getVolunteerList() {
		this.volunteerService.get().subscribe({
			next: (volunteers: Volunteer[]) => {
				this.volunteerList = volunteers;
			},
			error: (error) => {
				console.log(error);
			}
		});
	}
}
