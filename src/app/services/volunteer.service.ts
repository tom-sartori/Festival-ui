import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {Volunteer} from "../models/volunteer.model";
import {HttpResponse} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  private dataPath: string = '/volunteer';

  constructor(
      private appService: AppService
  ) { }

  public createVolunteer(volunteer: Volunteer): Observable<Volunteer> {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return this.appService.http.post<Volunteer>(
        this.appService.apiUrl + this.dataPath,
        volunteer,
        { headers }
    );
  }

  public get(): Observable<Volunteer[]> {
    return this.appService.http.get<Volunteer[]>(this.appService.apiUrl + this.dataPath);
  }

  public getById(id: string): Observable<Volunteer> {
    return this.appService.http.get<Volunteer>(this.appService.apiUrl + this.dataPath+ '/id/' +id);
  }

  public getByZone(idZone: string): Observable<Volunteer[]> {
    return this.appService.http.get<Volunteer[]>(this.appService.apiUrl + this.dataPath+ '/zone-id/' +idZone);
  }

  public update(volunteer: Volunteer): Observable<Volunteer> {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return this.appService.http.patch<Volunteer>(
        this.appService.apiUrl + this.dataPath + '/' + volunteer.id,
        volunteer,
        { headers }
    );
  }

  public deleteVolunteer(id: string): Observable<HttpResponse<Volunteer>> {
    const headers = {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    };

    return this.appService.http.delete<Volunteer>(
        this.appService.apiUrl + this.dataPath+ '/' +id,
        {
          headers,
          observe: 'response'
        }
    );
  }

}
