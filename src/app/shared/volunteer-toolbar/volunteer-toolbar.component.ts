import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameService} from "@services/game.service";
import {TranslateService} from "@services/translate.service";
import {VolunteerService} from "@services/volunteer.service";

@Component({
  selector: 'app-volunteer-toolbar',
  templateUrl: './volunteer-toolbar.component.html',
  styleUrls: ['./volunteer-toolbar.component.scss']
})
export class VolunteerToolbarComponent implements OnInit {

  //@Output() onChangeCategory: EventEmitter<string | null> = new EventEmitter<string | null>();
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onChangeCountPerPage: EventEmitter<number> = new EventEmitter<number>();
  @Output() onChangeViewType: EventEmitter<{ viewType: string; viewCol: number; }>
      = new EventEmitter<{ viewType: string; viewCol: number }>();

  //public categoryList: string[] = [];

  constructor(public volunteerService: VolunteerService, public translateService: TranslateService) {
  }

  ngOnInit(): void {

  }



  public search(value: string) {
    this.onSearch.emit(value);
  }

  public changeCountPerPage(countPerPage: number) {
    this.onChangeCountPerPage.emit(countPerPage);
  }

  public changeViewType({ viewType, viewCol }: { viewType: string; viewCol: number }) {
    this.onChangeViewType.emit({ viewType, viewCol });
  }

}
