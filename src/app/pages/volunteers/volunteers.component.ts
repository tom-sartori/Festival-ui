import {Component, OnInit, ViewChild} from '@angular/core';
import {VolunteerService} from "../../services/volunteer.service";
import {Volunteer} from "../../models/volunteer.model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Paginator} from "@models/shared/paginator.model";
import {AppService} from "@services/app.service";
import {PaginationService} from "@services/pagination.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss']
})
export class VolunteersComponent implements OnInit {
  public volunteersList: Volunteer[] = []
  public message: string | null = '';

  // Pagination.
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  public paginator: Paginator = new Paginator([], 1, 12, null, 2, 0, 0);

  public viewType: string = 'grid';
  public viewCol: number = 33.3;

  public column: number = 4;

  constructor(
      public appService: AppService,
      public paginationService: PaginationService,
      public volunteerService : VolunteerService

  ) { }

  ngOnInit(): void {
    this.getVolunteerList();

  }

  public getVolunteerList() : void {
    this.volunteerService.get().subscribe((volunteer: Volunteer[]) => {
      this.volunteersList = volunteer;
      this.paginateData();
    })
  }

  public onSearch(searchBarValue: string): void {
    if (!searchBarValue) {
      this.getVolunteerList();
      return;
    }
    const searchValue = searchBarValue.trim();
    let searchByName$ = this.volunteerService.getByLastName(searchValue);
    let searchByFirstName$ = this.volunteerService.getByFirstName(searchValue);

    forkJoin([searchByName$, searchByFirstName$]).subscribe(([searchByName, searchByFirstName]) => {
      this.volunteersList = [...searchByName, ...searchByFirstName];
      this.paginateData();
    });
  }

  public changeCountPerPage(countPerPage: number){
    this.paginator.countPerPage = countPerPage;
    this.paginator.reset();
    this.getVolunteerList();
  }

  public changeViewType( { viewType, viewCol }: { viewType: string, viewCol: number } ){
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public changePage(event: PageEvent){
    this.paginator.page = event.pageIndex + 1;
    this.paginateData();

    window.scrollTo({
      left: 0,
      top: 360,
      behavior: 'smooth'
    });
  }

  public paginateData(): void {
    let result: Paginator = this.paginationService.paginator(this.volunteersList, this.paginator.page, this.paginator.countPerPage);

    if (this.volunteersList.length === 0) {
      // If there is no data.
      this.paginator.reset();
      this.message = this.appService.getTranslateValue('VOLUNTEER.NO_DATA');
    }
    else {
      // If there is data.
      this.paginator = result;
      this.message = null;
    }
  }
}
