import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ZoneService} from "@services/zone.service";
import {Zone} from "@models/zone.model";
import {GameService} from "@services/game.service";
import {Game} from "@models/game.model";
import {forkJoin} from "rxjs";
import {Volunteer} from "@models/volunteer.model";
import {VolunteerService} from "@services/volunteer.service";
import {Slot} from "@models/slot.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public zone: Zone = new Zone('', '', [], []);
  public sub: any;
  public games : Game[] = [];

  dataSource!: MatTableDataSource<Slot>;
  public message: string | null = null;

  displayedColumns: string[] = ['startDate', 'endDate', 'volunteerRefs', 'games'];

  public slots : Slot[] = []

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public volunteers : string[] = [];
  public volunteerList: Volunteer[] = [];

  constructor(
      private activatedRoute: ActivatedRoute,
      private zoneService : ZoneService,
      private gameService: GameService,
      private volunteerService : VolunteerService
              ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getZoneById(params['id'])
    })
    this.getVolunteerList();


  }

  public initDataSource() {
    this.dataSource = new MatTableDataSource(this.slots);
    console.log(this.dataSource)
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

  public getZoneById(id: string){
    this.zoneService.getById(id).subscribe((zone : Zone) => {
      this.zone = zone;
      this.getGamesByIds(zone.gameRefs)
      this.slots = zone.slots
      this.initDataSource();

    })
  }

  public getVolunteerList(): void {
    this.volunteerService.get()
        .subscribe((data: Volunteer[]) => {
          this.volunteerList = data;
        });
  }

  public getGamesByIds(gameIds: string[]) {
    console.log(this.zone)
    const observables = gameIds.map((id: string) => this.gameService.getById(id));
    forkJoin(observables).subscribe((games: Game[]) => {
      this.games = games;
    });
  }
}
