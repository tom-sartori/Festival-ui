import {Slot} from "./slot.model";

export class Zone {
    name: string;
    gameRefs: string[];
    slots: Slot[]

    constructor(name: string, gameRefs: string[], slots: Slot[]) {
        this.name = name;
        this.gameRefs = gameRefs;
        this.slots = slots
    }
}
