import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Variety} from 'src/app/app.models';
import {AppService} from 'src/app/services/app.service';
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
      @Inject(MAT_DIALOG_DATA) public variety: Variety,
      public fb: UntypedFormBuilder,
      public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: '',
      name: [null, Validators.required],
      description: [null, Validators.required]
    });

    if (this.variety) {
      this.form.patchValue(this.variety);
    }
  }

  public onSubmit() {
    if (this.form.valid) {

      (this.variety ?
          this.appService.updateVariety(this.form.value) :  // Updating.
          this.appService.createVariety(this.form.value)    // Creating.
      ).subscribe({
        next: () => {
          // Created.
          this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.VARIETY." + (this.variety ? "UPDATED" : "CREATED"))!, '×', {
            panelClass: 'success',
            verticalPosition: 'top',
            duration: 3000
          });

          this.appService.getVarieties().subscribe(varieties => {
            // Update the list with the added object.
            this.appService.Data.varieties = varieties;
          });

          this.dialogRef.close(this.form.value);
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.VARIETY.ERROR")!, '×', {
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
