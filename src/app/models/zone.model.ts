import {Slot} from "./slot.model";

export class Zone {
    id: string;
    name: string;
    gameRefs: string[];
    slots: Slot[]

    constructor(id: string, name: string, gameRefs: string[], slots: Slot[]) {
        this.id = id;
        this.name = name;
        this.gameRefs = gameRefs;
        this.slots = slots
    }
}
