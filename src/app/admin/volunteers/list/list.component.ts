import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {VolunteerService} from "../../../services/volunteer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Volunteer} from "../../../models/volunteer.model";
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public volunteers: Volunteer[] = []
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'action'];
  dataSource!: MatTableDataSource<Volunteer>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
      public volunteerService: VolunteerService,
      public appService : AppService,
      public snackBar: MatSnackBar,
      public router: Router
  ) { }

  ngOnInit(): void {

    this.getVolunteers();

    if(!this.volunteers.length) {
      this.getVolunteers();
    }
    else {
      this.initDataSource();
    }
  }

  public initDataSource() {
    this.dataSource = new MatTableDataSource(this.volunteers);
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

  public handlerDelete(volunteerId: string) {
    const message = this.appService.getTranslateValue('Etes-vous sûr de vouloir supprimer ce bénévole ?');
    let dialogRef = this.appService.openConfirmDialog('', message!);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        // Delete product.
        this.volunteerService.deleteVolunteer(volunteerId).subscribe({
          next: () => {
            // Deleted.
            this.snackBar.open(this.appService.getTranslateValue("Bénévole supprimé!")!, '×', {
              panelClass: 'success',
              verticalPosition: 'top',
              duration: 3000
            });
            this.getVolunteers();
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


  public getVolunteers(){
    this.volunteerService.get().subscribe((volunteer: Volunteer[]) => {
      //console.table(volunteer);
      this.volunteers = volunteer;
      this.initDataSource();
    })
  }
  public handlerAdd() {
    this.router.navigate(['/admin/volunteer/add']).then();
  }

    public handlerUpdate(id: string) {
      this.router.navigate(['/admin/volunteer/update', id]).then();
    }

}
