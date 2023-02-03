import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {emailValidator, matchingPasswords} from 'src/app/theme/utils/app-validators';
import {DomSanitizer} from '@angular/platform-browser';
import {AppService} from '../../services/app.service';
import {User} from '../../app.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm!: UntypedFormGroup;
  public hide = true;
  public bgImage:any;
  constructor(
      public appService: AppService,
      public fb: UntypedFormBuilder,
      public router:Router,
      public snackBar: MatSnackBar,
      private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/register/background.jpg)');
    this.registerForm = this.fb.group({
      // username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      receiveNewsletter: false
    },{validator: matchingPasswords('password', 'confirmPassword')});
  }

  public onRegisterFormSubmit():void {
    if (this.registerForm.valid) {
      const newUser: User = new User(
          '',
          this.registerForm.value.email,
          this.registerForm.value.lastName,
          this.registerForm.value.firstName,
          this.registerForm.value.password,
      );

      this.appService.createUser(newUser).subscribe({
        next: (data) => {
          if (data.status === 201) {
            // Created.
            this.snackBar.open('You registered successfully!', '×', {
              panelClass: 'success',
              verticalPosition: 'top',
              duration: 3000
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/login']).then( () => { });
            });
          }
        },
        error: (error) => {
          if (error.status === 409) {
            // Conflict error. Email already in use.
            this.snackBar.open('Error : Email already in use. ', '×', {
              panelClass: 'error',
              verticalPosition: 'top',
              duration: 3000
            });
          } else {
            // Other error.
            this.snackBar.open('Error : ' + error.error, '×', {
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
