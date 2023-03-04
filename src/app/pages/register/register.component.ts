import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from 'src/app/theme/utils/app-validators';
import { AppService } from '@services/app.service';
import { AuthenticationService } from '@services/authentication.service';
import { User } from '@models/user.model';
import { SnackBarService } from '@services/snack-bar.service';
import { TranslateService } from '@services/translate.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	public registerForm!: UntypedFormGroup;
	public hide = true;

	constructor(
		public appService: AppService,
		public fb: UntypedFormBuilder,
		public router: Router,
		public snackBar: MatSnackBar,
		private authenticationService: AuthenticationService,
		private snackBarService: SnackBarService,
		private translateService: TranslateService
	) {
	}

	ngOnInit() {
		this.registerForm = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.compose([Validators.required, emailValidator])],
			password: ['', Validators.required],
			confirmPassword: ['', Validators.required]
		}, { validator: matchingPasswords('password', 'confirmPassword') });
	}

	public onRegisterFormSubmit(): void {
		if (this.registerForm.valid) {
			const newUser: User = new User(
				this.registerForm.value.firstName,
				this.registerForm.value.lastName,
				this.registerForm.value.email,
				this.registerForm.value.password
			);

			this.authenticationService.register(newUser)
				.subscribe({
					next: (data) => {
						// Registration successful.
						this.snackBarService.openSuccess(this.translateService.getTranslatedValue('SNACKBAR.REGISTRATION_SUCCESS')!)
							.afterDismissed().subscribe(() => {
								this.router.navigate(['/login']).then(() => {
									window.location.reload();
								});
							}
						);
					},
					error: (error) => {
						// Conflict error. Email already in use.
						console.error(error);
						this.snackBarService.openError(this.translateService.getTranslatedValue(
							error.status === 409
							? 'SNACKBAR.USER_ALREADY_EXISTS'
							: 'SNACKBAR.ERROR')!
						);
					}
				});
		}
	}
}
