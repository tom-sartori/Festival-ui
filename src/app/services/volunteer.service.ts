import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {Volunteer} from "../models/volunteer.model";

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

  public get(): Observable<Volunteer> {
    return this.appService.http.get<Volunteer>(this.appService.apiUrl + this.dataPath);
  }

  public getById(id: string): Observable<Volunteer> {
    return this.appService.http.get<Volunteer>(this.appService.apiUrl + this.dataPath+ '/' +{id});
  }

  public update(volunteer: Volunteer): Observable<Volunteer> {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return this.appService.http.put<Volunteer>(
        this.appService.apiUrl + this.dataPath + '/' + volunteer.id,
        volunteer,
        { headers }
    );
  }

  public deleteVolunteer(id: string): Observable<{}> {
    return this.appService.http.delete(this.appService.apiUrl + this.dataPath+ '/' +{id});
  }

}


// public createEvent(event: Event): Observable<Event> {
//   const headers = {
//     'Content-Type' : 'application/json',
//     'Accept' : 'application/json'
//   };
//
//   return this.http.post<Event>(
//       this.apiUrl + "/reservation/event",
//       event,
//       { headers }
//   );
// }
