import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Game} from "../../../models/game.model";
import {GameService} from "../../../services/game.service";
import {SnackBarService} from "../../../services/snack-bar.service";
import {AppService} from "../../../services/app.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public form!: UntypedFormGroup; /// TODO
  public categoryList: string[] = this.gameService.getCategoryList();

  constructor(
      public appService: AppService,
      public gameService: GameService,
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public game: Game,
      public fb: UntypedFormBuilder,
      public snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: '',
      name: [null, Validators.required],
      type: [null, Validators.required]
    });

    if (this.game) {
      this.form.patchValue(this.game);
    }
  }

  public onSubmit() {
    if (this.form.valid) {

      (this.game ?
              this.gameService.update(this.form.value) :  // Updating.
              this.gameService.createGame(this.form.value)    // Creating.
      ).subscribe({
        next: () => {
          // Created.
          this.snackBarService.openSuccess(this.appService.getTranslateValue("SNACKBAR." + (this.game ? "UPDATED" : "CREATED"))!);

          /// TODO : Update list
          this.dialogRef.close(this.form.value);
        },
        error: (error) => {
          console.log(error);
          this.snackBarService.openError(this.appService.getTranslateValue("SNACKBAR.ERROR")!);
          this.dialogRef.close(this.form.value);
        }
      });
    }
  }

  public equals(option: any, value: any): boolean {
    return _.isEqual(option, value);
  }
}
