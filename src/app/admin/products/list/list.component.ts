import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Product} from 'src/app/app.models';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AppService} from 'src/app/services/app.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['image', 'category', 'name', 'price', 'action'];
  dataSource!: MatTableDataSource<Product>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
      public appService: AppService,
      public snackBar: MatSnackBar,
      public router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();

    if(!this.appService.Data.products.length) {
      this.getProducts();
    }
    else {
      this.initDataSource();
    }
  }

  public initDataSource() {
    this.dataSource = new MatTableDataSource(this.appService.Data.products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      if(!this.getPropertyByPath(data, sortHeaderId)) {
        return this.sort.direction === "asc" ? '3' : '1';
      }
      return '2' + this.getPropertyByPath(data, sortHeaderId).toString().toLocaleLowerCase();
    }
  }

  getPropertyByPath(item: Object, property: string) {
    return (property.split('.').reduce((o:any, i:any) => o[i], item));
  }

  public handlerDelete(productId: string) {
    const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
    let dialogRef = this.appService.openConfirmDialog('', message!);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        // Delete product.
        this.appService.deleteProduct(productId).subscribe({
          next: () => {
            // Deleted.
            this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.PRODUCT.DELETED")!, '×', {
              panelClass: 'success',
              verticalPosition: 'top',
              duration: 3000
            });
            this.getProducts();
          },
          error: (error) => {
            console.log(error);
            this.snackBar.open(
                this.appService.getTranslateValue("SNACKBAR.ERROR.ERROR")! + error.error,
                '×', {
                  panelClass: 'error',
                  verticalPosition: 'top',
                  duration: 3000
                });
          }
        });
      }
    });
  }

  public getName(product: Product) {
    // if (product.type == 'Wine') {
    //   let cuvee: Cuvee | undefined = this.appService.Data.cuvees.find(cuvee => cuvee.id == (product as Wine).cuveeId);
    //   if (cuvee != undefined) {
    //     // @ts-ignore
    //     return this.appService.Data.names.find(name => name.id == cuvee.nameId).name + ' ' + this.appService.Data.vintages.find(vintage => vintage.id == cuvee.vintageId).value;
    //   }
    // }
    return product.name.name;
  }

  public handlerAdd() {
    this.router.navigate(['/admin/products/add']).then();
  }

  public handlerUpdate(id: string) {
    this.router.navigate(['/admin/products/update', id]).then();
  }

  public getProducts() {
    this.appService.getProducts().subscribe(products => {
      this.appService.Data.products = products;
      this.initDataSource();
    });
  }
}
