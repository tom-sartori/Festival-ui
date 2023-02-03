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

  public get(): Observable<Volunteer> {
    return this.appService.http.get<Volunteer>(this.appService.apiUrl + this.dataPath);
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
