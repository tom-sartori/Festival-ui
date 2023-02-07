import { Component, OnInit } from '@angular/core';
import {VolunteerService} from "../../services/volunteer.service";
import {Volunteer} from "../../models/volunteer.model";

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss']
})
export class VolunteersComponent implements OnInit {
  public volunteers: Volunteer[] = []
  constructor( public volunteerService : VolunteerService) { }

  ngOnInit(): void {
    this.volunteerService.get().subscribe((volunteer: Volunteer[]) => {
      console.table(volunteer);
      this.volunteers = volunteer;
    })
  }

}
