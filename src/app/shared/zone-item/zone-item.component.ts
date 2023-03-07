import {Component, Input, OnInit} from '@angular/core';
import {AppService} from "@services/app.service";
import {Zone} from "@models/zone.model";

@Component({
  selector: 'app-zone-item',
  templateUrl: './zone-item.component.html',
  styleUrls: ['./zone-item.component.scss']
})
export class ZoneItemComponent implements OnInit {

  @Input() zone!: Zone;

  @Input() lazyLoad: boolean = false;

  @Input() viewType: string = 'grid';

  @Input() viewColChanged: any;

  public column: number = 4;

  constructor(
      public appService: AppService
  ) {

  }

  ngOnInit(): void {
  }

}
