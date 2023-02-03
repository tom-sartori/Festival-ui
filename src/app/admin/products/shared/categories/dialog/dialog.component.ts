import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AppService} from '../../../../../services/app.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Category} from '../../../../../app.models';
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
      @Inject(MAT_DIALOG_DATA) public category: Category,
      public fb: UntypedFormBuilder,
      public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: '',
      name: [null, Validators.required],
      description: [null, Validators.required]
    });

    if (this.category) {
      this.form.patchValue(this.category);
    }
  }

  public onSubmit() {
    if (this.form.valid) {

      (this.category ?
              this.appService.updateCategory(this.form.value) :  // Updating.
              this.appService.createCategory(this.form.value)    // Creating.
      ).subscribe({
        next: () => {
          // Created.
          this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.CATEGORY." + (this.category ? "UPDATED" : "CREATED"))!, '×', {
            panelClass: 'success',
            verticalPosition: 'top',
            duration: 3000
          });

          this.appService.getCategories().subscribe(categories => {
            // Update the list with the added object.
            this.appService.Data.categories = categories;
          });

          this.dialogRef.close(this.form.value);
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.CATEGORY.ERROR")!, '×', {
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
