import { Injectable } from '@angular/core';
import {AppService} from "./app.service";
import {Zone} from "../models/zone.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private dataPath: string = '/zone';
  constructor(private appService: AppService) { }

  public createGame(zone: Zone): Observable<Zone> {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return this.appService.http.post<Zone>(
        this.appService.apiUrl + this.dataPath,
        zone,
        { headers }
    );
  }

  public get(): Observable<Zone> {
    return this.appService.http.get<Zone>(this.appService.apiUrl + this.dataPath);
  }

  public getById(id: string): Observable<Zone> {
    return this.appService.http.get<Zone>(this.appService.apiUrl + this.dataPath+ '/' +{id});
  }

  ///TODO : Liste des bénévoles / créneau pour une zone donnée
  /// TODO : Liste des bénévoles / zone pour un créneau donné

  public addGameToZone(zoneId: string, gameId: string): Observable<Zone> {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return this.appService.http.patch<Zone>(
        this.appService.apiUrl + this.dataPath + '/zone-id/' + zoneId + '/game-id/' + gameId,
        null,
        { headers }
    );
  }

  public addVolunteerToZone(zoneId: string, volunteerId: string): Observable<Zone> {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return this.appService.http.patch<Zone>(
        this.appService.apiUrl + this.dataPath + '/zone-id/' + zoneId + '/volunteer-id/' + volunteerId,
        null,
        { headers }
    );
  }


  public update(zone: Zone): Observable<Zone> {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return this.appService.http.put<Zone>(
        this.appService.apiUrl + this.dataPath + '/' + zone.id,
        zone,
        { headers }
    );
  }

  public deleteGame(id: string): Observable<{}> {
    return this.appService.http.delete(this.appService.apiUrl + this.dataPath+ '/' +{id});
  }
}