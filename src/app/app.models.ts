import {Optional} from '@angular/core';

export class Restaurant {
    constructor(
        public id: number,
        public name: string,
        public address: string,
        public phone: string
    ){}
}

export class Employee {
    constructor(
        public id: number,
        public image: string,
        public firstName: string,
        public lastName: string,
        public middleName: string,
        public email: string,
        public phone: string,
        public addresses: Address[],
        public position: Position
    ){}
}

//['General Manager','Assistant Manager'] ... https://aptito.com/blog/restaurant-positions-and-descriptions
export class Position {
    constructor(
        public id: number,
        public name: string
    ){}
}

export class Address {
    constructor(
        public id: number,
        public country: Country,
        public city: string,
        public place: string,
        public postalCode: string,
        public addressLine: string
    ){}
}

export class Country {
    constructor(
        public name: string,
        public code: string
    ){}
}

export class Customer {
    constructor(
        public id: number,
        public fullName: string,
        public email: string,
        public phoneNumber: string,
        public address: string
    ){}
}

export class Category {
    constructor(
        public id: string,
        public name: string,
        public description: string
    ){ }
}

export class Pagination {
    constructor(
        public page: number,
        public perPage: number,
        public prePage: number | null,
        public nextPage: number | null,
        public total: number,
        public totalPages: number
    ){ }
}

export class Contact {
    constructor(
        public address: string,
        public phone: string,
        public email: string
    ) {
    }
}

export class Participant {
    constructor(
        public name: string,
        public phone: string,
        public numberOfPeople: number
    ) {
    }
}

export class User {
    constructor (
        public id: string,
        public email: string,
        public lastname: string,
        public firstname: string,
        public password: string
    ) { }
}

export class Appellation {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public region: string,
        public country: string
    ) { }
}

export class Cuvee {
    constructor(
        public id: string,
        public name: Name,
        public keyColor: string,
        public vintage: Vintage,
        public appellation: Appellation,
        public varietyList: Variety[],
        public alcohol: number
    ) { }
}

export class Name {
    constructor(
        public id: string,
        public name: string,
        public description: string,
    ) { }
}

export class Variety {
    constructor(
        public id: string,
        public name: string,
        public description: string,
    ) { }
}

export class Vintage {
    constructor(
        public id: string,
        public value: number,
        public description: string,
    ) { }
}

export class Container {
    constructor(
        public capacity: number,
        public unit: string,
        public keyType: string,
    ) { }
}

export abstract class Product {
    public id: string;
    public name: Name;
    public category: Category;
    public price: number;
    public image: string;
    public technicalSheet: string;
    public type: string;

    protected constructor(
        name: Name,
        category: Category,
        price: number,
        image: string,
        technicalSheet: string,
        type: string,
        @Optional() id: string = ''
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.image = image;
        this.technicalSheet = technicalSheet;
        this.type = type;
    }
}

export class ProductExtended {
    public product: Product;

    public id: string;  /// TODO : Remove this and use product attribute.
    public name: Name;  /// TODO : Remove this and use product attribute.
    public category: Category;  /// TODO : Remove this and use product attribute.
    public price: number;   /// TODO : Remove this and use product attribute.
    public image: string;   /// TODO : Remove this and use product attribute.
    public technicalSheet: string;  /// TODO : Remove this and use product attribute.
    public type: string;    /// TODO : Remove this and use product attribute.

    public ratingsCount: number;
    public ratingsValue: number;
    public discount: number;
    public cartCount: number;
    public availibilityCount: number;
    public weight: number;

    constructor(
        product: Product,
        @Optional() ratingsCount: number = 8,
        @Optional() ratingsValue: number = 700,
        @Optional() discount: number = 0,
        @Optional() cartCount: number = 0,
        @Optional() availibilityCount: number = 0,
        @Optional() weight: number = 0
    ) {
        this.product = product;

        this.id = product.id;   /// TODO : Remove this and use product attribute.
        this.name = product.name;   /// TODO : Remove this and use product attribute.
        this.category = product.category;   /// TODO : Remove this and use product attribute.
        this.price = product.price; /// TODO : Remove this and use product attribute.
        this.image = product.image; /// TODO : Remove this and use product attribute.
        this.technicalSheet = product.technicalSheet; /// TODO : Remove this and use product attribute.
        this.type = product.type;   /// TODO : Remove this and use product attribute.

        this.ratingsCount = ratingsCount;
        this.ratingsValue = ratingsValue;
        this.discount = discount;
        this.cartCount = cartCount;
        this.availibilityCount = availibilityCount;
        this.weight = weight;
    }
}


export abstract class Liquid extends Product {
    public container: Container;

    protected constructor(
        name: Name,
        category: Category,
        price: number,
        image: string,
        technicalSheet: string,
        type: string,
        container: Container,
        @Optional() id: string = ''
    ) {
        super(name, category, price, image, technicalSheet, type, id);
        this.container = container;
    }
}

export class Wine extends Liquid {
    public cuvee: Cuvee;

    constructor(
        name: Name,
        category: Category,
        price: number,
        image: string,
        technicalSheet: string,
        container: Container,
        cuvee: Cuvee,
        @Optional() id: string = ''
    ) {
        super(name, category, price, image, technicalSheet, 'Wine', container, id);
        this.cuvee = cuvee;
    }
}

export class Oil extends Liquid {
    public appellation: Appellation;

    constructor(
        name: Name,
        category: Category,
        price: number,
        image: string,
        technicalSheet: string,
        container: Container,
        appellation: Appellation,
        @Optional() id: string = ''
    ) {
        super(name, category, price, image, technicalSheet, 'Oil', container, id);
        this.appellation = appellation;
    }
}
