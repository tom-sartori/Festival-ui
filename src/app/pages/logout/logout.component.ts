import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '@services/snack-bar.service';
import { TranslateService } from '@services/translate.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

	constructor(
		private authenticationService: AuthenticationService,
		private snackBarService: SnackBarService,
		private translateService: TranslateService,
		private router: Router
	) {
	}

	ngOnInit(): void {
		this.authenticationService.logout();
		this.router.navigate(['/home']).then(() => {
			window.location.reload();
		});
	}
}
