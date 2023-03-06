import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppService } from '@services/app.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '@services/snack-bar.service';
import { Volunteer } from '@models/volunteer.model';
import { isEqual } from 'lodash';
import { VolunteerService } from '@services/volunteer.service';
import { emailValidator } from '@theme/utils/app-validators';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
	public form!: UntypedFormGroup;

	constructor(
		public appService: AppService,
		public dialogRef: MatDialogRef<DialogComponent>,
		public volunteerService: VolunteerService,
		@Inject(MAT_DIALOG_DATA) public volunteer: Volunteer,
		public fb: UntypedFormBuilder,
		public snackBarService: SnackBarService
	) {
	}

	ngOnInit(): void {
		this.form = this.fb.group({
			id: '',
			firstName: [null, Validators.required],
			lastName: [null, Validators.required],
			email: [null, Validators.compose([Validators.required, emailValidator])],
		});

		if (this.volunteer) {
			this.form.patchValue(this.volunteer);
		}
	}

	public onSubmit() {
		if (this.form.valid) {

			(this.volunteer ?
			 this.volunteerService.update(this.form.value) :  // Updating.
			 this.volunteerService.createVolunteer(this.form.value)    // Creating.
			)
				.subscribe({
					next: () => {
						// Created.
						this.snackBarService.openSuccess(this.appService.getTranslateValue('SNACKBAR.' + (this.volunteer ? 'UPDATED' : 'CREATED'))!);
						this.dialogRef.close(this.form.value);
					},
					error: (error) => {
						console.log(error);
						this.snackBarService.openError(this.appService.getTranslateValue('SNACKBAR.ERROR')!);
						this.dialogRef.close(this.form.value);
					}
				});
		}
	}

	public equals(option: any, value: any): boolean {
		return isEqual(option, value);
	}
}
