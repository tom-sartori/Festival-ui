import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppService } from '@services/app.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isEqual } from 'lodash';
import { Volunteer } from '@models/volunteer.model';
import { VolunteerService } from '@services/volunteer.service';
import { DialogComponent as VolunteerDialogComponent } from '@admin/volunteers/dialog/dialog.component';
import { DialogService } from '@services/dialog.service';
import { Slot } from '@models/slot.model';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-slot-dialog',
	templateUrl: './slot-dialog.component.html',
	styleUrls: ['./slot-dialog.component.scss']
})
export class SlotDialogComponent implements OnInit {
	public form!: UntypedFormGroup;

	public volunteerList: Volunteer[] = [];
	public onSubmitSlotDialog: EventEmitter<Slot> = new EventEmitter<Slot>();

	public minStartDate: string | null = null;

	constructor(
		public appService: AppService,
		public dialogRef: MatDialogRef<SlotDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public slot: Slot,
		public fb: UntypedFormBuilder,
		public datePipe: DatePipe,
		public volunteerService: VolunteerService,
		public dialogService: DialogService
	) {
	}

	ngOnInit(): void {
		this.getVolunteerList();
		this.minStartDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');

		this.form = this.fb.group({
			startDate: [null, Validators.required],
			endDate: [null, Validators.required],
			volunteerRefs: [null, Validators.required]
		});

		if (this.slot) {
			this.form.patchValue(this.slot);
			this.form.patchValue({
				startDate: this.datePipe.transform(this.slot.startDate, 'yyyy-MM-ddTHH:mm'),
				endDate: this.datePipe.transform(this.slot.endDate, 'yyyy-MM-ddTHH:mm')
			})
		}
		else {
			this.form.patchValue({
				startDate: this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm'),
				endDate: this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm'),
			})
		}
	}

	public onSubmit() {
		if (this.form.valid) {
			this.onSubmitSlotDialog.emit(this.form.value);
			this.dialogRef.close(this.form.value);
		}
	}

	public getVolunteerList() {
		this.volunteerService.get().subscribe({
			next: (volunteers: Volunteer[]) => {
				this.volunteerList = volunteers;
				// Sort by last name, then first name.
				this.volunteerList.sort((a, b) => {
					const aName = a.lastName + a.firstName;
					const bName = b.lastName + b.firstName;
					return aName.localeCompare(bName);
				});
			},
			error: (error) => {
				console.log(error);
			}
		});
	}

	public onAddVolunteer() {
		this.dialogService
			.openDialog(VolunteerDialogComponent)
			.afterClosed()
			.subscribe(() => this.getVolunteerList());
	}

	public equals(option: any, value: any): boolean {
		return isEqual(option, value);
	}

	public getMinEndDate(): string {
		let startDate = this.form.get('startDate')?.value;
		return startDate ? startDate : this.minStartDate;
	}
}
