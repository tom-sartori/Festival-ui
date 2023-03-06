import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AppSettings } from 'src/app/app.settings';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent, ConfirmDialogModel } from '@shared/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '@shared/alert-dialog/alert-dialog.component';
import { AuthenticationService } from '@services/authentication.service';

export class Data {
	constructor() {
	}
}

@Injectable({
	providedIn: 'root'
})
export class AppService {

	public url = environment.url + '/assets/data/';

	public apiUrl = 'http://localhost:8080';
	// public apiUrl = "https://ejc9ojgoii.execute-api.eu-west-3.amazonaws.com";

	constructor(
		public http: HttpClient,
		public dialog: MatDialog,
		public appSettings: AppSettings,
		public translateService: TranslateService,
		private authenticationService: AuthenticationService
	) {
	}

	public headersJson = {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	};

	public headersJsonBearer = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': `Bearer ${this.authenticationService.getCurrentToken()}`
	};

	public openDialog(component: any, data: any, panelClass: any) {
		return this.dialog.open(component, {
			data: data,
			panelClass: panelClass,
			autoFocus: false,
			direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr'
		});
	}

	public openConfirmDialog(title: string, message: string) {
		const dialogData = new ConfirmDialogModel(title, message);
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			maxWidth: '400px',
			data: dialogData
		});
		return dialogRef;
	}

	public openAlertDialog(message: string) {
		const dialogRef = this.dialog.open(AlertDialogComponent, {
			maxWidth: '400px',
			data: message
		});
		return dialogRef;
	}

	public getTranslateValue(key: string, param: string = '') {
		let value = null;
		this.translateService.get(key, { param: param }).subscribe((res: string) => {
			value = res;
		});
		return value;
	}
}
