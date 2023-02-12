import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {SnackBarService} from "../../../services/snack-bar.service";
import {GameService} from "../../../services/game.service";
import {Game} from "../../../models/game.model";
import {AppService} from "../../../services/app.service";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'action'];
  dataSource!: MatTableDataSource<Game>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  public gameList: Game[] = [];

  constructor(
      public appService: AppService,
      public gameService: GameService,
      public snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.getGameList();
  }

  public getGameList() {
    this.gameService.get().subscribe({
      next: (response: Game[]) => {
        this.gameList = response;
        this.initDataSource();
      },
      error: (error) => {
        this.snackBarService.openError(error);
      }
    });
  }

  public initDataSource() {
    this.dataSource = new MatTableDataSource(this.gameList);
    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      return typeof data[sortHeaderId] === 'string' ? data[sortHeaderId].toLocaleLowerCase() : data[sortHeaderId];
    };

    this.dataSource.sort = this.sort;

    const sortState: Sort = {active: 'name', direction: 'asc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  public delete(gameId: string) {
    const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
    let dialogRef = this.appService.openConfirmDialog('', message!);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        // Delete element.
        this.gameService.deleteGame(gameId).subscribe({
          next: () => {
            // Deleted.
            this.snackBarService.openSuccess(this.appService.getTranslateValue("SNACKBAR.DELETED")!);
            this.getGameList();
          },
          error: (error) => {
            console.log(error);
            this.snackBarService.openError(this.appService.getTranslateValue("SNACKBAR.ERROR")!);
          }
        });
      }
    });
  }

  public openDialog(game: Game | null){
    const dialogRef = this.appService.openDialog(DialogComponent, game, 'theme-dialog');
    dialogRef.afterClosed().subscribe(() => {
      this.getGameList();
    });
  }
}
