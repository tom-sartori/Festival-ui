import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppSettings, Settings } from 'src/app/app.settings';
import { emailValidator } from '@theme/utils/app-validators';
import { AppService } from '@services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '@services/authentication.service';
import { SnackBarService } from '@services/snack-bar.service';
import { TranslateService } from '@services/translate.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public loginForm!: UntypedFormGroup;
	public hide = true;
	public settings: Settings;

	constructor(
		public fb: UntypedFormBuilder,
		public router: Router,
		public appSettings: AppSettings,
		public appService: AppService,
		public snackBar: MatSnackBar,
		private authenticationService: AuthenticationService,
		private snackBarService: SnackBarService,
		private translateService: TranslateService
	) {
		this.settings = this.appSettings.settings;
	}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: ['', Validators.compose([Validators.required, emailValidator])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
	}

	public onLoginFormSubmit(): void {
		if (this.loginForm.valid) {

			this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
				.subscribe({
					next: (data) => {
						// Logged in successfully.
						this.snackBarService.openSuccess(this.translateService.getTranslatedValue('SNACKBAR.LOGIN_SUCCESS')!)
							.afterDismissed().subscribe(() => {
								this.router.navigate(['/home']).then(() => {
									window.location.reload();
								});
							}
						);
					},
					error: (error) => {
						console.error(error);
						this.snackBarService.openError(this.translateService.getTranslatedValue(
							error.status === 401
							? 'SNACKBAR.INVALID_EMAIL_OR_PASSWORD'
							: 'SNACKBAR.ERROR')!
						);
					}
				});
		}
	}
}
