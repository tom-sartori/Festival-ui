import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ZoneService} from "@services/zone.service";
import {Zone} from "@models/zone.model";
import {GameService} from "@services/game.service";
import {Game} from "@models/game.model";
import {forkJoin} from "rxjs";
import {Volunteer} from "@models/volunteer.model";
import {VolunteerService} from "@services/volunteer.service";
import {Slot} from "@models/slot.model";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public zone: Zone = new Zone('', '', [], []);
  public sub: any;
  public games : Game[] = [];

  public slots : Slot[] = []
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

  public getZoneById(id: string){
    this.zoneService.getById(id).subscribe((zone : Zone) => {
      this.zone = zone;
      this.getGamesByIds(zone.gameRefs)
      this.slots = zone.slots

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
