import { Component, OnInit } from '@angular/core';
import { AppSettings, Settings } from 'src/app/app.settings';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public settings: Settings;

	constructor(
		public appSettings: AppSettings
	) {
		this.settings = this.appSettings.settings;
	}

	ngOnInit(): void {
	}
}
