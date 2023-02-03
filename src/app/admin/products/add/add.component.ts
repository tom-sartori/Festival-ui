import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Container, Liquid, Oil, Product, Wine} from 'src/app/app.models';
import {AppService} from 'src/app/services/app.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogComponent as NamesDialogComponent} from '../shared/names/dialog/dialog.component';
import {DialogComponent as AppellationsDialogComponent} from '../liquid/appellations/dialog/dialog.component';
import {DialogComponent as CategoriesDialogComponent} from '../shared/categories/dialog/dialog.component';
import {DialogComponent as CuveesDialogComponent} from '../liquid/cuvees/dialog/dialog.component';
import {MatSelectChange} from '@angular/material/select';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public form!: UntypedFormGroup;
  public isAdding: boolean = true;  // By default, is adding but can update.
  public currentProduct: Product | undefined;

  public currentProductType: string = '';
  public productTypes = ['Wine', 'Oil'];

  // Container attributes.
  public units = ['L', 'kg'];
  public keyTypes = ['GLASS_BOTTLE'];

  constructor(
      public appService: AppService,
      public formBuilder: UntypedFormBuilder,
      public snackBar: MatSnackBar,
      private activatedRoute: ActivatedRoute,
      public router: Router
  ) { }

  ngOnInit(): void {
    this.setForm();
    this.getData();

    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        // Is updating.
        this.isAdding = false;
        this.appService.getProduct(params['id']).subscribe({
          next: (product) => {
            this.currentProduct = product;
            this.currentProductType = this.currentProduct.type;
            this.setForm();
            this.patchForm(this.currentProduct);
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
              this.router.navigate(['/admin/products']).then();
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
    this.form.patchValue(values);

    if (this.currentProduct !== undefined && this.isLiquid()) {
      // Product has a container attribute.
      this.form.patchValue({
        capacity: (this.currentProduct as Liquid).container.capacity,
        unit: (this.currentProduct as Liquid).container.unit,
        keyType: (this.currentProduct as Liquid).container.keyType
      });
    }
  }

  public equals(option: any, value: any): boolean {
    return _.isEqual(option, value);
  }

  public onSubmit() {
    if (this.form.valid) {

      this.setCurrentProduct();

      (this.isAdding ?
              this.appService.createProduct(this.currentProduct!) :
              this.appService.updateProduct(this.currentProduct!.id, this.currentProduct!)
      ).subscribe({
        next: () => {
          // Created.
          this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.PRODUCT." + (this.isAdding ? "CREATED" : "UPDATED") )!, '×', {
            panelClass: 'success',
            verticalPosition: 'top',
            duration: 3000
          });

          this.appService.getProducts().subscribe(products => {
            // Update the list with the added object.
            this.appService.Data.products = products;
            this.router.navigate(['/admin/products']).then();
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
      });
    }
  }

  handlerOnchangeType(event: MatSelectChange) {
    const formValueCopy = this.form.value;
    this.currentProductType = event.value;

    this.setForm();
    this.patchForm(formValueCopy);
  }

  // Get the group of a particular product. Note that there is subclasses of Product.
  private setForm() {
    switch (this.currentProductType) {
      case 'Wine': this.form = this.formBuilder.group(this.wineGroup());
        break;
      case 'Oil': this.form = this.formBuilder.group(this.oilGroup());
        break;
      default: this.form = this.formBuilder.group(this.productGroup());
    }
  }

  private productGroup(): any {
    return {
      id: '',
      name: [null, Validators.required],
      category: [null, Validators.required],
      price: [null, Validators.required],
      image: [null, Validators.required],
      technicalSheet: [null, Validators.required],
      type: [null, Validators.required]
    };
  }
  ;

  private liquidGroup(): any {
    let liquidGroup = this.productGroup();

    liquidGroup.capacity = [null, Validators.required];
    liquidGroup.unit = [null, Validators.required];
    liquidGroup.keyType = [null, Validators.required];

    return liquidGroup;
  }

  private wineGroup() {
    let wineGroup = this.liquidGroup();

    wineGroup.cuvee = [null, Validators.required];

    return wineGroup;
  }

  private oilGroup() {
    let wineGroup = this.liquidGroup();

    wineGroup.appellation = [null, Validators.required];

    return wineGroup;
  }

  public isLiquid(): boolean {
    return this.currentProductType == 'Wine' || this.currentProductType == 'Oil';
  }

  handlerCancel() {
    this.router.navigate(['/admin/products']).then();
  }

// Init data in appService if isn't already done.
  public getData() {
    this.getNames();
    this.getAppellations();
    this.getCategories();
    this.getCuvees();
  }

  public getNames() {
    if (!this.appService.Data.names.length) {
      this.appService.getNames().subscribe(names => {
        this.appService.Data.names = names;
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

  public getCategories() {
    if (!this.appService.Data.categories.length) {
      this.appService.getCategories().subscribe(categories => {
        this.appService.Data.categories = categories;
      });
    }
  }

  public getCuvees() {
    if (!this.appService.Data.cuvees.length) {
      this.appService.getCuvees().subscribe(cuvees => {
        this.appService.Data.cuvees = cuvees;
      });
    }
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

  public setCurrentProduct() {
    if (this.isLiquid()) {
      const container: Container = new Container(this.form.value.capacity, this.form.value.unit, this.form.value.keyType);

      if (this.form.value.type === 'Wine') {
        // The product is a wine.
        this.currentProduct = new Wine(
            this.form.value.name,
            this.form.value.category,
            this.form.value.price,
            this.form.value.image,
            this.form.value.technicalSheet,
            container,
            this.form.value.cuvee
        );
      }
      else if (this.form.value.type === 'Oil') {
        // The product is a wine.
        this.currentProduct = new Oil(
            this.form.value.name,
            this.form.value.category,
            this.form.value.price,
            this.form.value.image,
            this.form.value.technicalSheet,
            container,
            this.form.value.appellation
        );
      }
    }
    else {
      // Not a known product type.
      this.snackBar.open('Not a known product type. ', '×', {
        panelClass: 'error',
        verticalPosition: 'top',
        duration: 3000
      });
    }
  }
}
