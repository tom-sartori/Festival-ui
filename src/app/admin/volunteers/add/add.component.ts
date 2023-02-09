import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Container, Liquid, Oil, Product, Wine} from "../../../app.models";
import {AppService} from "../../../services/app.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";
import {MatSelectChange} from "@angular/material/select";
import {DialogComponent as NamesDialogComponent} from "../../products/shared/names/dialog/dialog.component";
import {
  DialogComponent as AppellationsDialogComponent
} from "../../products/liquid/appellations/dialog/dialog.component";
import {DialogComponent as CategoriesDialogComponent} from "../../products/shared/categories/dialog/dialog.component";
import {DialogComponent as CuveesDialogComponent} from "../../products/liquid/cuvees/dialog/dialog.component";
import {VolunteerService} from "../../../services/volunteer.service";
import {Volunteer} from "../../../models/volunteer.model";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public volunteers: Volunteer[] = []
  public form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
  });
  public isAdding: boolean = true;  // By default, is adding but can update.
  public currentVolunteer: Volunteer | undefined;


  constructor(
      public volunteerService: VolunteerService,
      public appService: AppService,
      public formBuilder: UntypedFormBuilder,
      public snackBar: MatSnackBar,
      private activatedRoute: ActivatedRoute,
      public router: Router,
      private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.setForm();

    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        // Is updating.
        console.log("rrrrjrjrjirjirjrjirjroir")
        this.isAdding = false;
        this.volunteerService.getById(params['id']).subscribe({
          next: (volunteer) => {
            this.currentVolunteer = volunteer;
            this.setForm();
            this.patchForm(this.currentVolunteer);
          },
          error: (error) => {
            console.log(error);
            this.snackBar.open(
                this.appService.getTranslateValue("SNACKBAR.ERROR.ERROR")! + error.error,
                '×', {
                  panelClass: 'error',
                  verticalPosition: 'top',
                  duration: 3000
                }).afterDismissed().subscribe(() => {
              this.router.navigate(['/admin/volunteer']).then();
            });
          }
        });
      }
      else {
        // Is adding.
        this.isAdding = true;
        this.setForm();
      }
    });
  }

  private patchForm(values: any) {
    this.form.patchValue({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email
    });
  }

  public equals(option: any, value: any): boolean {
    return _.isEqual(option, value);
  }

  public onSubmit(): void {
    const volunteerFirstname = this.form.value.firstName;
    const volunteerLastname = this.form.value.lastName;
    const volunteerEmail = this.form.value.email;
    if (volunteerFirstname != null && volunteerLastname != null && volunteerEmail != null) {
      let volunteerToAdd = new Volunteer('', volunteerFirstname, volunteerLastname, volunteerEmail);
      if (this.isAdding){
        this.volunteerService.createVolunteer(volunteerToAdd).subscribe({
          next: () => {
            // Created.
            this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.PRODUCT." + "CREATED" )!, '×', {
              panelClass: 'success',
              verticalPosition: 'top',
              duration: 3000
            });
          },
          error: (error) => {
            console.log(error);
            this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.PRODUCT.ERROR")!, '×', {
              panelClass: 'error',
              verticalPosition: 'top',
              duration: 3000
            });

          }
        })
      }else{
        let volunteerToUpdate = new Volunteer(this.currentVolunteer!.id,volunteerFirstname, volunteerLastname, volunteerEmail);
        this.volunteerService.update(volunteerToUpdate)
        .subscribe({
        next:() => {
          // Created.
          this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.PRODUCT." + "UPDATED")!, '×', {
            panelClass: 'success',
            verticalPosition: 'top',
            duration: 3000
          });
        },
          error: (error) => {
            console.log(error);
            this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.PRODUCT.ERROR")!, '×', {
              panelClass: 'error',
              verticalPosition: 'top',
              duration: 3000
            });

        }
      })
      }
    }
    this.form.reset();
    this.router.navigate(['/admin/volunteer']).then();
  }
  /*
  public onSubmit() {
    console.log(this.form.valid)
    if (this.form.valid) {
      //this.setCurrentProduct();

      (this.isAdding ?
              this.volunteerService.createVolunteer(this.currentVolunteer!) :
              this.volunteerService.update(this.currentVolunteer!)
      ).subscribe();

          this.volunteerService.get().subscribe(volunteer => {
            // Update the list with the added object.
            //this.appService.Data.products = products;
            this.router.navigate(['/admin/volunteer']).then();
          });
        },
        error: (error) => {
          console.log(error);

        }
      });


    }
}
*/
/*
  handlerOnchangeType(event: MatSelectChange) {
    const formValueCopy = this.form.value;
    this.currentProductType = event.value;

    this.setForm();
    this.patchForm(formValueCopy);
  }
*/
  // Get the group of a particular product. Note that there is subclasses of Product.
  private setForm() {
    this.form = this.formBuilder.group(this.volunteerGroup());
  }

  private volunteerGroup(): any {
    return {
      id: '',
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
    };
  }
  ;

  handlerCancel() {
    this.router.navigate(['/admin/volunteer']).then();
  }





  public addName() {
    this.appService.openDialog(NamesDialogComponent, null, 'theme-dialog');
  }

  addAppellation() {
    this.appService.openDialog(AppellationsDialogComponent, null, 'theme-dialog');
  }

  addCategory() {
    this.appService.openDialog(CategoriesDialogComponent, null, 'theme-dialog');
  }

  addCuvee() {
    this.appService.openDialog(CuveesDialogComponent, null, 'theme-dialog');
  }


  public getVolunteers(){
    this.volunteerService.get().subscribe((volunteer: Volunteer[]) => {
      //console.table(volunteer);
      this.volunteers = volunteer;
      console.table("volontaiiiiiiire"+this.volunteers)
    })
  }
}
