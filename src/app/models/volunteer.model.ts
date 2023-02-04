export class Volunteer {
    id: string;
    firstName : string;
    lastName : string;
    email : String;

    constructor(id : string, firstName : string, lastName : string, email : String) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
