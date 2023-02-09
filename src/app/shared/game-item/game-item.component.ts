import {Component, Input, OnInit, SimpleChange} from '@angular/core';
import {Game} from "../../models/game.model";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-game-item[game]',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit {
  @Input() game!: Game;
  @Input() lazyLoad: boolean = false;
  @Input() viewType: string = "grid";
  @Input() viewColChanged: any;
  public column: number = 4;

  constructor(
      public appService: AppService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    if(changes.viewColChanged){
      this.getColumnCount(changes.viewColChanged.currentValue);
    }
  }

  public getColumnCount(value: number) {
    if(value == 25){
      this.column = 4;
    }
    else if(value == 33.3){
      this.column = 3;
    }
    else if(value == 50){
      this.column = 2
    }
    else{
      this.column = 1;
    }
  }
}
