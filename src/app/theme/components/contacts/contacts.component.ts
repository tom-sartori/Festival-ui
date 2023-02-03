import {Component, Input, OnInit} from '@angular/core';
import {ContactService} from "../../../services/contact.service";

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
	@Input() dividers: boolean = true;
	@Input() iconSize: string = 'sm';
	@Input() iconColor: string = '';

	constructor(
		public contactService: ContactService
	) {}

	ngOnInit() {
		this.contactService.get();
	}
}
