
//['General Manager','Assistant Manager'] ... https://aptito.com/blog/restaurant-positions-and-descriptions
export class Position {
    constructor(
        public id: number,
        public name: string
    ){}
}

export class Country {
    constructor(
        public name: string,
        public code: string
    ){}
}
