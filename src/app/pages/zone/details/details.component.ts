import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ZoneService} from "@services/zone.service";
import {Zone} from "@models/zone.model"

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public zone : any;
  public sub: any;
  constructor(
      private activatedRoute: ActivatedRoute,
      private zoneService : ZoneService
              ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getZoneById(params['id'])
    })
  }

  public getZoneById(id: string){
    this.zoneService.getById(id).subscribe((zone : Zone) => {
      this.zone = zone;
    })
  }

}
