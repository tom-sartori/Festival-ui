export class Slot {
	startDate: string;
	endDate: string;
	volunteerRefs: string[];

	constructor(startDate: string, endDate: string, volunteerRefs: string[]) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.volunteerRefs = volunteerRefs;
	}
}
