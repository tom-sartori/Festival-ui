import {Component, OnInit, ViewChild} from '@angular/core';
import {Vintage} from 'src/app/app.models';
import {MatTableDataSource} from '@angular/material/table';
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
  displayedColumns: string[] = ['value', 'description', 'action'];
  dataSource!: MatTableDataSource<Vintage>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
      public appService: AppService,
      public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if(!this.appService.Data.vintages.length) {
      this.getVintages();
    }
    else {
      this.initDataSource();
    }
  }

  public initDataSource() {
    this.dataSource = new MatTableDataSource(this.appService.Data.vintages);
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

  public delete(vintageId: string) {
    const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
    let dialogRef = this.appService.openConfirmDialog('', message!);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        // Delete vintage.
        this.appService.deleteVintage(vintageId).subscribe({
          next: () => {
            // Deleted.
            this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.VINTAGE.DELETED")!, '×', {
              panelClass: 'success',
              verticalPosition: 'top',
              duration: 3000
            });
            this.getVintages();
          },
          error: (error) => {
            console.log(error);
            this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.VINTAGE.ERROR")!, '×', {
              panelClass: 'error',
              verticalPosition: 'top',
              duration: 3000
            });
          }
        });
      }
    });
  }

  public getVintages() {
    this.appService.getVintages().subscribe(vintages => {
      this.appService.Data.vintages = vintages;
      this.initDataSource();
    });
  }

  public openVintageDialog(vintage: Vintage | null){
    const dialogRef = this.appService.openDialog(DialogComponent, vintage, 'theme-dialog');
    dialogRef.afterClosed().subscribe(() => {
      this.initDataSource();
    });
  }
}
