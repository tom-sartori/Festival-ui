export class Slot {
    startDate: Date;
    endDate : Date;
    volunteerRef: string[];

    constructor(startDate: Date, endDate: Date, volunteerRef: string[]) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.volunteerRef = volunteerRef;
    }
}
