import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AppService} from 'src/app/services/app.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Cuvee} from 'src/app/app.models';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogComponent as NamesDialogComponent} from '../../../shared/names/dialog/dialog.component';
import {DialogComponent as VintagesDialogComponent} from '../../../liquid/vintage/dialog/dialog.component';
import {DialogComponent as AppellationsDialogComponent} from '../../../liquid/appellations/dialog/dialog.component';
import {DialogComponent as VarietiesDialogComponent} from '../../../liquid/varieties/dialog/dialog.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public form!: UntypedFormGroup;
  public test: boolean = false;

  constructor(
      public appService: AppService,
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public cuvee: Cuvee,
      public fb: UntypedFormBuilder,
      public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getData();

    this.form = this.fb.group({
      id: '',
      name: [null, Validators.required],
      keyColor: [null, Validators.required],
      vintage: [null, Validators.required],
      appellation: [null, Validators.required],
      varietyList: [null, Validators.required],
      alcohol: [null, Validators.required],
    });

    if (this.cuvee) {
      this.form.patchValue(this.cuvee);
    }
  }

  public onSubmit() {
    if (this.form.valid) {

      (this.cuvee ?
              this.appService.updateCuvee(this.cuvee.id, this.form.value) :  // Updating.
              this.appService.createCuvee(this.form.value)    // Creating.
      ).subscribe({
        next: () => {
          // Created.
          this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.CUVEE." + (this.cuvee ? "UPDATED" : "CREATED"))!, '×', {
            panelClass: 'success',
            verticalPosition: 'top',
            duration: 3000
          });

          this.appService.getCuvees().subscribe(cuvees => {
            // Update the list with the added object.
            this.appService.Data.cuvees = cuvees;
          });

          this.dialogRef.close(this.form.value);
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.CUVEE.ERROR")!, '×', {
            panelClass: 'error',
            verticalPosition: 'top',
            duration: 3000
          });
          this.dialogRef.close(this.form.value);
        }
      });
    }
  }

  public equals(option: any, value: any): boolean {
    return _.isEqual(option, value);
  }

  // Init data in appService if isn't already done.
  public getData() {
    this.getNames();
    this.getVintages();
    this.getAppellations();
    this.getVarieties();
  }

  public getNames() {
    if (!this.appService.Data.names.length) {
      this.appService.getNames().subscribe(names => {
        this.appService.Data.names = names;
      });
    }
  }

  public getVintages() {
    if (!this.appService.Data.vintages.length) {
      this.appService.getVintages().subscribe(vintages => {
        this.appService.Data.vintages = vintages;
      });
    }
  }

  public getAppellations() {
    if (!this.appService.Data.appellations.length) {
      this.appService.getAppellations().subscribe(appellations => {
        this.appService.Data.appellations = appellations;
      });
    }
  }

  public getVarieties() {
    if (!this.appService.Data.varieties.length) {
      this.appService.getVarieties().subscribe(varieties => {
        this.appService.Data.varieties = varieties;
      });
    }
  }

  public addName() {
    this.appService.openDialog(NamesDialogComponent, null, 'theme-dialog');
  }

  addVintage() {
    this.appService.openDialog(VintagesDialogComponent, null, 'theme-dialog');
  }

  addAppellation() {
    this.appService.openDialog(AppellationsDialogComponent, null, 'theme-dialog');
  }

  addVariety() {
    this.appService.openDialog(VarietiesDialogComponent, null, 'theme-dialog');
  }
}
