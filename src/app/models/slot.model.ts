export class Slot {
    startDate: string;
    endDate : string;
    volunteerRef: string[];

    constructor(startDate: string, endDate: string, volunteerRef: string[]) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.volunteerRef = volunteerRef;
    }
}
