import {Injectable} from '@angular/core';
import {Contact} from "src/app/models/contact.model";

@Injectable({
	providedIn: 'root'
})
export class ContactService {
	public data: Contact = new Contact('Place Charles de Gaulle, 34000 Montpellier')

	constructor() { }

	public get(): Contact {
		return this.data;
	}
}
