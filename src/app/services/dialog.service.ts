import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '@shared/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '@shared/alert-dialog/alert-dialog.component';
import { AppSettings } from '../app.settings';

@Injectable({
	providedIn: 'root'
})
export class DialogService {
	constructor(public dialog: MatDialog, public appSettings: AppSettings) {}

	public openDialog(
		component: any,
		data: any,
		panelClass: string = 'theme-dialog'
	) {
		return this.dialog.open(component, {
			data: data,
			panelClass: panelClass,
			autoFocus: false,
			direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr'
		});
	}

	public openConfirmDialog(title: string, message: string) {
		const dialogData = new ConfirmDialogModel(title, message);
		return this.dialog.open(ConfirmDialogComponent, {
			maxWidth: '400px',
			data: dialogData
		});
	}

	public openAlertDialog(message: string) {
		return this.dialog.open(AlertDialogComponent, {
			maxWidth: '400px',
			data: message
		});
	}
}
