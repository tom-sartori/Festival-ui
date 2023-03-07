import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Zone } from '@models/zone.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private dataPath: string = '/zone';
  constructor(private appService: AppService) { }

  public createZone(zone: Zone): Observable<Zone> {
    return this.appService.http.post<Zone>(
        this.appService.apiUrl + this.dataPath,
        zone,
        { headers: this.appService.headersJsonBearer }
    );
  }

  public get(): Observable<Zone[]> {
    return this.appService.http.get<Zone[]>(this.appService.apiUrl + this.dataPath);
  }

  public getById(id: string): Observable<Zone> {
    return this.appService.http.get<Zone>(this.appService.apiUrl + this.dataPath+ '/id/' +id);
  }

  /**
   *
   * Get zones by their name.
   * @param name the name of the zone to retrieve.
   * @return An observable that emits the retrieved zone.
   */
  public getByName(name : string): Observable<Zone[]> {
    return this.appService.http.get<Zone[]>(this.appService.apiUrl + this.dataPath+ '/name/' +name);
  }

  ///TODO : Liste des bénévoles / créneau pour une zone donnée
  /// TODO : Liste des bénévoles / zone pour un créneau donné

  public addGameToZone(zoneId: string, gameId: string): Observable<Zone> {
    return this.appService.http.patch<Zone>(
        this.appService.apiUrl + this.dataPath + '/zone-id/' + zoneId + '/game-id/' + gameId,
        null,
        { headers: this.appService.headersJsonBearer }
    );
  }

  public addVolunteerToZone(zoneId: string, volunteerId: string): Observable<Zone> {
    return this.appService.http.patch<Zone>(
        this.appService.apiUrl + this.dataPath + '/zone-id/' + zoneId + '/volunteer-id/' + volunteerId,
        null,
        { headers: this.appService.headersJsonBearer }
    );
  }

  public update(zone: Zone): Observable<Zone> {
    return this.appService.http.patch<Zone>(
        this.appService.apiUrl + this.dataPath + '/' + zone.id,
        zone,
        { headers: this.appService.headersJsonBearer }
    );
  }

  public delete(id: string): Observable<{}> {
    return this.appService.http.delete(this.appService.apiUrl + this.dataPath+ '/' + id,
        { headers: this.appService.headersJsonBearer }
    );
  }
}
