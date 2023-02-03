import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Cuvee} from 'src/app/app.models';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AppService} from 'src/app/services/app.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'color', 'vintage', 'action'];
  dataSource!: MatTableDataSource<Cuvee>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
      public appService: AppService,
      public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getNames();    // Init data if isn't already done.
    this.getVintages(); // Init data if isn't already done.

    if(!this.appService.Data.cuvees.length) {
      this.getCuvees();
    }
    else {
      this.initDataSource();
    }
  }

  public initDataSource() {
    this.dataSource = new MatTableDataSource(this.appService.Data.cuvees);
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

  public delete(cuveeId: string) {
    const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
    let dialogRef = this.appService.openConfirmDialog('', message!);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        // Delete cuvee.
        this.appService.deleteCuvee(cuveeId).subscribe({
          next: () => {
            // Deleted.
            this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.CUVEE.DELETED")!, '×', {
              panelClass: 'success',
              verticalPosition: 'top',
              duration: 3000
            });
            this.getCuvees();
          },
          error: (error) => {
            console.log(error);
            this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.CUVEE.ERROR")!, '×', {
              panelClass: 'error',
              verticalPosition: 'top',
              duration: 3000
            });
          }
        });
      }
    });
  }

  public getCuvees() {
    this.appService.getCuvees().subscribe(cuvees => {
      this.appService.Data.cuvees = cuvees;
      this.initDataSource();
    });
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

  public openCuveeDialog(cuvee: Cuvee | null){
    const dialogRef = this.appService.openDialog(DialogComponent, cuvee, 'theme-dialog');
    dialogRef.afterClosed().subscribe(() => {
      this.initDataSource();
    });
  }
}
