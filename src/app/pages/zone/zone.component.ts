import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Paginator} from "@models/shared/paginator.model";
import {AppService} from "@services/app.service";
import {ZoneService} from "@services/zone.service";
import {Zone} from "@models/zone.model";
import {PaginationService} from "@services/pagination.service";

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {

  public zoneList: Zone[] = [];

  public message: string | null = '';
  //public selectedGameType: string | null = null;

  // Pagination.
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  public paginator: Paginator = new Paginator([], 1, 12, null, 2, 0, 0);

  public viewType: string = 'grid';
  public viewCol: number = 25;


  constructor(
      public appService: AppService,
      public paginationService: PaginationService,
      public zoneService: ZoneService
  ) {
  }

  ngOnInit(): void {
    this.getZoneList();
  }

  public getZoneList(): void {
    this.zoneService.get().subscribe((zoneList: Zone[]) => {
      this.zoneList = zoneList;
      this.paginateData();
    });
  }

  public getZoneListByName(name: string): void {
    this.zoneService.getByName(name).subscribe((zoneList: Zone[]) => {
      this.zoneList = zoneList;
      this.paginateData();
    });
  }

  public onSearch(searchBarValue: string) {
    searchBarValue ? this.getZoneListByName(searchBarValue) : this.getZoneList();
  }


  public changeCountPerPage(countPerPage: number) {
    this.paginator.countPerPage = countPerPage;
    this.paginator.reset();
    this.getZoneList();
  }

  public changeViewType({ viewType, viewCol }: { viewType: string, viewCol: number }) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public changePage(event: PageEvent) {
    this.paginator.page = event.pageIndex + 1;
    this.paginateData();

    window.scrollTo({
      left: 0,
      top: 360,
      behavior: 'smooth'
    });
  }

  public paginateData(): void {
    this.zoneList.sort((a: Zone, b: Zone) => a.name.localeCompare(b.name));    /// TODO : see if it works.
    let result: Paginator = this.paginationService.paginator(this.zoneList, this.paginator.page, this.paginator.countPerPage);

    if (this.zoneList.length === 0) {
      // If there is no data.
      this.paginator.reset();
      this.message = this.appService.getTranslateValue('GAME.NO_DATA');
    }
    else {
      // If there is data.
      this.paginator = result;
      this.message = null;
    }
  }

}
