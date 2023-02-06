import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {Volunteer} from "../models/volunteer.model";
import {Game} from "../models/game.model";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private dataPath: string = '/game';

  constructor( private appService: AppService) { }

  public createGame(game: Game): Observable<Game> {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return this.appService.http.post<Game>(
        this.appService.apiUrl + this.dataPath,
        Game,
        { headers }
    );
  }

  public get(): Observable<Game> {
    return this.appService.http.get<Game>(this.appService.apiUrl + this.dataPath);
  }

  public getById(id: string): Observable<Game> {
    return this.appService.http.get<Game>(this.appService.apiUrl + this.dataPath+ '/' +{id});
  }

  public getByName(name : string): Observable<Game> {
    return this.appService.http.get<Game>(this.appService.apiUrl + this.dataPath+ '/' +{name});
  }
  public getByType(type : string): Observable<Game> {
    return this.appService.http.get<Game>(this.appService.apiUrl + this.dataPath+ '/' +{type});
  }
  public getByZone(zone : string): Observable<Game> {
    return this.appService.http.get<Game>(this.appService.apiUrl + this.dataPath+ '/' +{zone});
  }

  public update(game: Game): Observable<Game> {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return this.appService.http.put<Game>(
        this.appService.apiUrl + this.dataPath + '/' + game.id,
        game,
        { headers }
    );
  }

  public deleteGame(id: string): Observable<{}> {
    return this.appService.http.delete(this.appService.apiUrl + this.dataPath+ '/' +{id});
  }


}
