import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {AppSettings, Settings} from 'src/app/app.settings';
import {emailValidator} from '../../theme/utils/app-validators';
import {User} from '../../app.models';
import {AppService} from '../../services/app.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm!: UntypedFormGroup;
    public hide = true;
    public bgImage:any;
    public settings: Settings;
    constructor(
        public fb: UntypedFormBuilder,
        public router: Router,
        private sanitizer: DomSanitizer,
        public appSettings: AppSettings,
        public appService: AppService,
        public snackBar: MatSnackBar
    ) {
        this.settings = this.appSettings.settings;
    }

    ngOnInit(): void {
        this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/login/background.jpg)');
        this.loginForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, emailValidator])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            rememberMe: false
        });
    }

    public onLoginFormSubmit():void {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value)

            const user: User = new User(
                '',
                this.loginForm.value.email,
                '',
                '',
                this.loginForm.value.password
            );
            this.appService.loginUser(user).subscribe({
                next: (data) => {
                    if (data.status === 200) {
                        // Created.
                        this.snackBar.open('You logged in successfully!', '×', {
                            panelClass: 'success',
                            verticalPosition: 'top',
                            duration: 3000
                        }).afterDismissed().subscribe(() => {
                            this.router.navigate(['/account']).then( () => { });
                        });
                    } else {
                        console.log(data);
                    }
                },
                error: (error) => {
                    if (error.status === 401) {
                        this.snackBar.open('Invalid email or password.', '×', {
                            panelClass: 'error',
                            verticalPosition: 'top',
                            duration: 3000
                        });
                    }
                }
            });
        }
    }
}
