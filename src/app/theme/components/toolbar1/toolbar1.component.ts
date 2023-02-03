import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AppService} from 'src/app/services/app.service';

@Component({
  selector: 'app-toolbar1',
  templateUrl: './toolbar1.component.html'
})
export class Toolbar1Component implements OnInit {
  @Output() onMenuIconClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(public appService:AppService) { }

  ngOnInit() { }

  public sidenavToggle(){
    this.onMenuIconClick.emit();
  }
}
