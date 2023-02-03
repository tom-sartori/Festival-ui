import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AppService} from 'src/app/services/app.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Vintage} from 'src/app/app.models';
import {MatSnackBar} from '@angular/material/snack-bar';

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
      @Inject(MAT_DIALOG_DATA) public vintage: Vintage,
      public fb: UntypedFormBuilder,
      public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: '',
      value: [null, Validators.required],
      description: [null, Validators.required]
    });

    if (this.vintage) {
      this.form.patchValue(this.vintage);
    }
  }

  public onSubmit() {
    if (this.form.valid) {

      (this.vintage ?
              this.appService.updateVintage(this.form.value) :  // Updating.
              this.appService.createVintage(this.form.value)    // Creating.
      ).subscribe({
        next: () => {
          // Created.
          this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.VINTAGE." + (this.vintage ? "UPDATED" : "CREATED"))!, '×', {
            panelClass: 'success',
            verticalPosition: 'top',
            duration: 3000
          });

          this.appService.getVintages().subscribe(vintages => {
            // Update the list with the added object.
            this.appService.Data.vintages = vintages;
          });

          this.dialogRef.close(this.form.value);
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.VINTAGE.ERROR")!, '×', {
            panelClass: 'error',
            verticalPosition: 'top',
            duration: 3000
          });
          this.dialogRef.close(this.form.value);
        }
      });
    }
  }
}
