import {Component, OnInit, ViewChild} from '@angular/core';
import {GameService} from "../../services/game.service";
import {Game} from "../../models/game.model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {AppService} from "../../services/app.service";
import {PaginationService} from "../../services/pagination.service";
import {Paginator} from "../../models/shared/paginator.model";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  // Data.
  public gameListProxy: Game[] = [];

  public message: string | null = '';
  public selectedGameType: string | null = null;

  // Pagination.
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  public paginator: Paginator = new Paginator([], 1, 12, null, 2, 0, 0);

  public viewType: string = 'grid';
  public viewCol: number = 25;


  constructor(
      public appService: AppService,
      public paginationService: PaginationService,
      public gameService: GameService
  ) { }

  ngOnInit(): void {
    this.getGameList();
  }

  public getGameList(): void {
    this.selectedGameType ? this.getGameListByType(this.selectedGameType) : this.getAllGameList();
  }

  public getAllGameList(): void {
    this.gameService.get().subscribe((gameList: Game[]) => {
      this.gameListProxy = gameList;
      this.paginateData();
    });
  }

  public getGameListByType(type: string): void {
    this.gameService.getByType(type).subscribe((gameList: Game[]) => {
      this.gameListProxy = gameList;
      this.paginateData();
    });
  }

  public getGameListByName(name: string): void {
    this.gameService.getByName(name).subscribe((gameList: Game[]) => {
      this.gameListProxy = gameList;
      this.paginateData();
    });
  }

  public changeCategory(category: string | null){
    this.selectedGameType = category;
    this.paginator.reset();
    this.getGameList();
  }

  public onSearch(searchBarValue: string) {
    searchBarValue ? this.getGameListByName(searchBarValue) : this.getGameList();
  }

  public changeCountPerPage(countPerPage: number){
    this.paginator.countPerPage = countPerPage;
    this.paginator.reset();
    this.getGameList();
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
    let result: Paginator = this.paginationService.paginator(this.gameListProxy, this.paginator.page, this.paginator.countPerPage);

    if (this.gameListProxy.length === 0) {
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
