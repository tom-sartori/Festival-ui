import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Appellation} from 'src/app/app.models';
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
  displayedColumns: string[] = ['name', 'description', 'region', 'country', 'action'];
  dataSource!: MatTableDataSource<Appellation>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
      public appService: AppService,
      public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if(!this.appService.Data.appellations.length) {
      this.getAppellations();
    }
    else {
      this.initDataSource();
    }
  }

  public initDataSource() {
    this.dataSource = new MatTableDataSource(this.appService.Data.appellations);
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

  public delete(appellationId: string) {
    const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
    let dialogRef = this.appService.openConfirmDialog('', message!);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        // Delete appellation.
        this.appService.deleteAppellation(appellationId).subscribe({
          next: () => {
            // Deleted.
            this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.APPELLATION.DELETED")!, '×', {
              panelClass: 'success',
              verticalPosition: 'top',
              duration: 3000
            });
            this.getAppellations();
          },
          error: (error) => {
            console.log(error);
            this.snackBar.open(this.appService.getTranslateValue("SNACKBAR.APPELLATION.ERROR")!, '×', {
              panelClass: 'error',
              verticalPosition: 'top',
              duration: 3000
            });
          }
        });
      }
    });
  }

  public getAppellations() {
    this.appService.getAppellations().subscribe(appellations => {
      this.appService.Data.appellations = appellations;
      this.initDataSource();
    });
  }

  public openVarietyDialog(appellation: Appellation | null){
    const dialogRef = this.appService.openDialog(DialogComponent, appellation, 'theme-dialog');
    dialogRef.afterClosed().subscribe(() => {
      this.initDataSource();
    });
  }
}
