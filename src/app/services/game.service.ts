import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {Game} from "../models/game.model";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private dataPath: string = '/game';

  constructor(private appService: AppService) { }

  /**
   * Create a new game and store it in the collection.
   * @param game The game to create.
   * @return An observable that emits the created game.
   */
  public createGame(game: Game): Observable<Game> {

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return this.appService.http.post<Game>(
        this.appService.apiUrl + this.dataPath,
        game,
        { headers }
    );
  }

  /**
   *
   * Retrieve all the games from the backend.
   * @return An Observable emitting the list of games retrieved from the backend.
   */
  public get(): Observable<Game[]> {
    return this.appService.http.get<Game[]>(this.appService.apiUrl + this.dataPath);
  }

  /**
   *
   * Get a game by its id.
   * @param id the id of the game to retrieve.
   * @return An observable that emits the retrieved game.
   */
  public getById(id: string): Observable<Game> {
    return this.appService.http.get<Game>(this.appService.apiUrl + this.dataPath+ '/id/' + id);
  }

  /**
   *
   * Get games by their name.
   * @param name the name of the game to retrieve.
   * @return An observable that emits the retrieved game.
   */
  public getByName(name : string): Observable<Game[]> {
    return this.appService.http.get<Game[]>(this.appService.apiUrl + this.dataPath+ '/name/' +name);
  }

  /**
   *
   * Get games by their type.
   * @param type the type of the games to retrieve.
   * @return An observable that emits the retrieved games.
   */
  public getByType(type : string): Observable<Game[]> {
    return this.appService.http.get<Game[]>(this.appService.apiUrl + this.dataPath+ '/type/' +type);
  }

  /**
   *
   * This method returns games by their zone.
   * @param zone the zone of the games to retrieve.
   * @return An observable that emits the retrieved games.
   */

  public getByZone(zone : string): Observable<Game> {
    return this.appService.http.get<Game>(this.appService.apiUrl + this.dataPath+ '/zone-id/' +zone);
  }

  /**
   *
   * Update an existing game.
   @param game the game to update.
   @return An observable that emits the updated game.
   */
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

  /**
   *
   * Delete a game by its id.
   @param id the id of the game to delete.
   @return An observable that emits an empty response when the operation is successful.
   */
  public deleteGame(id: string): Observable<{}> {
    return this.appService.http.delete(this.appService.apiUrl + this.dataPath+ '/' +id);
  }
}
