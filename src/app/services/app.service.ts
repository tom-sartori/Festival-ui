import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
	Appellation,
	Category,
	Country,
	Cuvee,
	Name,
	Oil,
	Product,
	ProductExtended,
	User,
	Variety,
	Vintage,
	Wine
} from 'src/app/app.models';
import { AppSettings } from 'src/app/app.settings';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../shared/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { map } from 'rxjs/operators';

export class Data {
	constructor(
		public categories: Category[],
		public cartList: ProductExtended[],
		public favorites: Product[],
		public totalPrice: number,
		public totalCartCount: number,
		public appellations: Appellation[],
		public names: Name[],
		public varieties: Variety[],
		public vintages: Vintage[],
		public cuvees: Cuvee[],
		public products: Product[]
	) {}
}

@Injectable({
	providedIn: 'root',
})
export class AppService {
	public Data = new Data([], [], [], 0, 0, [], [], [], [], [], []);

	public url = environment.url + '/assets/data/';

	// public apiUrl = 'http://localhost:8080';
	public apiUrl = 'https://ejc9ojgoii.execute-api.eu-west-3.amazonaws.com';

	constructor(
		public http: HttpClient,
		private datePipe: DatePipe,
		private bottomSheet: MatBottomSheet,
		private snackBar: MatSnackBar,
		public dialog: MatDialog,
		public appSettings: AppSettings,
		public translateService: TranslateService
	) {}

	// public getCategories(): Observable<Category[]> {
	// 	return this.http.get<Category[]>(this.url + 'categories.json');
	// }

	public getHomeCarouselSlides() {
		return this.http.get<any[]>(this.url + 'slides.json');
	}

	public getReservations() {
		return this.http.get<any[]>(this.url + 'reservations.json');
	}

	public getOrders() {
		return this.http.get<any[]>(this.url + 'orders.json');
	}

	public getEvents(): Observable<Event[]> {
		return this.http.get<Event[]>(this.apiUrl + "/reservation/event");
	}

	public getNextEvents(): Observable<Event[]> {
		return this.http.get<Event[]>(this.apiUrl + "/reservation/event/next");
	}

	public getOneEvent(id: string): Observable<Event> {
		return this.http.get<Event>(this.apiUrl + "/reservation/event/" + id);
	}

	public createEvent(event: Event): Observable<Event> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.post<Event>(
			this.apiUrl + "/reservation/event",
			event,
			{ headers }
		);
	}

	public updateEvent(event: Event): Observable<Event> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.put<Event>(
			this.apiUrl + "/reservation/event",
			event,
			{ headers }
		);
	}

	public deleteEvent(eventId: string): Observable<Event> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.delete<Event>(
			this.apiUrl + "/reservation/event/" + eventId,
			{ headers }
		);
	}

	public participateToEvent(eventId: string, participant: any) {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.post<any>(
			this.apiUrl + "/reservation/event/participate/" + eventId,
			participant,
			{ headers }
		);
	}

	public createUser(user: User): Observable<HttpResponse<User>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.post<User>(
			this.apiUrl + "/user",
			user,
			{
				headers,
				observe: 'response'
			}
		)
	}

	public loginUser(user: User): Observable<HttpResponse<User>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.post<User>(
			this.apiUrl + "/user/login",
			user,
			{
				headers,
				observe: 'response'
			}
		)
	}

	private productRoute: string = '/product';
	private appellationRoute: string = this.productRoute + '/appellation';

	public createAppellation(appellation: Appellation): Observable<HttpResponse<Appellation>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.post<Appellation>(
			this.apiUrl + this.appellationRoute,
			appellation,
			{
				headers,
				observe: 'response'
			}
		)
	}

	public getAppellations(): Observable<Appellation[]> {
		return this.http.get<Appellation[]>(
			this.apiUrl + this.appellationRoute
		);
	}

	// public updateAppellation(appellationId: string, appellation: Appellation): Observable<HttpResponse<Appellation>> {
	// 	const headers = {
	// 		'Content-Type' : 'application/json',
	// 		'Accept' : 'application/json'
	// 	};
	//
	// 	return this.http.put<Appellation>(
	// 		this.apiUrl + this.appellationRoute + '/' + appellationId,
	// 		appellation,
	// 		{
	// 			headers,
	// 			observe: 'response'
	// 		}
	// 	);
	// }

	public updateAppellation(appellation: Appellation): Observable<HttpResponse<Appellation>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.put<Appellation>(
			this.apiUrl + this.appellationRoute,
			appellation,
			{
				headers,
				observe: 'response'
			}
		);
	}

	public deleteAppellation(appellationId: string): Observable<HttpResponse<Appellation>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.delete<Appellation>(
			this.apiUrl + this.appellationRoute + '/' + appellationId,
			{
				headers,
				observe: 'response'
			}
		);
	}


	private varietyRoute: string = this.productRoute + '/wine/variety';

	public createVariety(variety: Variety): Observable<HttpResponse<Variety>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.post<Variety>(
			this.apiUrl + this.varietyRoute,
			variety,
			{
				headers,
				observe: 'response'
			}
		)
	}

	public getVarieties(): Observable<Variety[]> {
		return this.http.get<Variety[]>(
			this.apiUrl + this.varietyRoute
		);
	}

	public updateVariety(variety: Variety): Observable<HttpResponse<Variety>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.put<Variety>(
			this.apiUrl + this.varietyRoute,
			variety,
			{
				headers,
				observe: 'response'
			}
		);
	}

	public deleteVariety(varietyId: string): Observable<HttpResponse<Variety>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.delete<Variety>(
			this.apiUrl + this.varietyRoute + '/' + varietyId,
			{
				headers,
				observe: 'response'
			}
		);
	}


	private vintageRoute: string = this.productRoute + '/wine/vintage';

	public createVintage(vintage: Vintage): Observable<HttpResponse<Vintage>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.post<Vintage>(
			this.apiUrl + this.vintageRoute,
			vintage,
			{
				headers,
				observe: 'response'
			}
		)
	}

	public getVintages(): Observable<Vintage[]> {
		return this.http.get<Vintage[]>(
			this.apiUrl + this.vintageRoute
		);
	}

	public updateVintage(vintage: Vintage): Observable<HttpResponse<Vintage>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.put<Vintage>(
			this.apiUrl + this.vintageRoute,
			vintage,
			{
				headers,
				observe: 'response'
			}
		);
	}

	public deleteVintage(vintageId: string): Observable<HttpResponse<Vintage>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.delete<Vintage>(
			this.apiUrl + this.vintageRoute + '/' + vintageId,
			{
				headers,
				observe: 'response'
			}
		);
	}

	private categoryRoute: string = this.productRoute + '/category';

	public createCategory(category: Category): Observable<HttpResponse<Category>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.post<Category>(
			this.apiUrl + this.categoryRoute,
			category,
			{
				headers,
				observe: 'response'
			}
		)
	}

	public getCategories(): Observable<Category[]> {
		return this.http.get<Category[]>(
			this.apiUrl + this.categoryRoute
		);
	}

	public updateCategory(category: Category): Observable<HttpResponse<Category>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.put<Category>(
			this.apiUrl + this.categoryRoute,
			category,
			{
				headers,
				observe: 'response'
			}
		);
	}

	public deleteCategory(categoryId: string): Observable<HttpResponse<Category>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.delete<Category>(
			this.apiUrl + this.categoryRoute + '/' + categoryId,
			{
				headers,
				observe: 'response'
			}
		);
	}

	private nameRoute: string = this.productRoute + '/name';

	public createName(name: Name): Observable<HttpResponse<Name>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.post<Name>(
			this.apiUrl + this.nameRoute,
			name,
			{
				headers,
				observe: 'response'
			}
		)
	}

	public getNames(): Observable<Name[]> {
		return this.http.get<Name[]>(
			this.apiUrl + this.nameRoute
		);
	}

	public updateName(name: Name): Observable<HttpResponse<Name>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.put<Name>(
			this.apiUrl + this.nameRoute,
			name,
			{
				headers,
				observe: 'response'
			}
		);
	}

	public deleteName(nameId: string): Observable<HttpResponse<Name>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.delete<Name>(
			this.apiUrl + this.nameRoute + '/' + nameId,
			{
				headers,
				observe: 'response'
			}
		);
	}

	private cuveeRoute: string = this.productRoute + '/wine/cuvee';

	public createCuvee(cuvee: Cuvee): Observable<HttpResponse<Cuvee>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.post<Cuvee>(
			this.apiUrl + this.cuveeRoute,
			cuvee,
			{
				headers,
				observe: 'response'
			}
		)
	}

	public getCuvees(): Observable<Cuvee[]> {
		return this.http.get<Cuvee[]>(
			this.apiUrl + this.cuveeRoute
		);
	}

	public updateCuvee(id: string, cuvee: Cuvee): Observable<HttpResponse<Cuvee>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.put<Cuvee>(
			this.apiUrl + this.cuveeRoute + '/' + id,
			cuvee,
			{
				headers,
				observe: 'response'
			}
		);
	}

	public deleteCuvee(cuveeId: string): Observable<HttpResponse<Cuvee>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.delete<Cuvee>(
			this.apiUrl + this.cuveeRoute + '/' + cuveeId,
			{
				headers,
				observe: 'response'
			}
		);
	}


	public createProduct(product: Product): Observable<HttpResponse<Product>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.post<Product>(
			this.apiUrl + this.productRoute,
			product,
			{
				headers,
				observe: 'response'
			}
		)
	}

	public getProducts(): Observable<Product[]> {
		return this.http.get<Product[]>(
			this.apiUrl + this.productRoute
		);
	}

	public getProduct(id: string): Observable<Product> {
		return this.http.get<Product>(
			this.apiUrl + this.productRoute + '/' + id
		);
	}

	public updateProduct(id: string, product: Product): Observable<HttpResponse<Product>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.put<Product>(
			this.apiUrl + this.productRoute + '/' + id,
			product,
			{
				headers,
				observe: 'response'
			}
		);
	}

	public deleteProduct(productId: string): Observable<HttpResponse<Product>> {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		};

		return this.http.delete<Product>(
			this.apiUrl + this.productRoute + '/' + productId,
			{
				headers,
				observe: 'response'
			}
		);
	}

	public getGUID() {
		let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
			.replace(/[xy]/g, function (c) {
				let r = (Math.random() * 16) | 0,
					v = c == 'x' ? r : (r & 0x3) | 0x8;
				return v.toString(16);
			})
			.toLowerCase();
		return guid;
	}

	// Function used to wrap the product in params to his real type.
	public wrapProduct(product: Product): Product {
		switch (product.type) {
			case 'Wine':
				return new Wine(product.name, product.category, product.price, product.image, product.technicalSheet, (product as Wine).container, (product as Wine).cuvee, product.id);
			case 'Oil':
				return new Oil(product.name, product.category, product.price, product.image, product.technicalSheet, (product as Oil).container, (product as Oil).appellation, product.id);
			default:
				return product;
		}
	}

	public addToCart(productExtended: ProductExtended, component: any) {
		productExtended.product = this.wrapProduct(productExtended.product);

		if (!this.Data.cartList.find((item : ProductExtended) => item.product.id == productExtended.product.id)) {
			productExtended.cartCount = productExtended.cartCount ? productExtended.cartCount : 1;
			this.Data.cartList.push(productExtended);
			this.calculateCartTotal();
			if (component) {
				this.openCart(component);
			}
			else {
				this.snackBar.open('The menu item "' + productExtended.product.name.name + '" has been added to cart.', '×', {
					verticalPosition: 'top',
					duration: 3000,
					direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr',
					panelClass: ['success'],
				});
			}
		}
	}

	public openCart(component: any) {
		this.bottomSheet
			.open(component, {
				direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr',
			})
			.afterDismissed()
			.subscribe((isRedirect) => {
				if (isRedirect) {
					window.scrollTo(0, 0);
				}
			});
	}

	public calculateCartTotal() {
		this.Data.totalPrice = 0;
		this.Data.totalCartCount = 0;
		this.Data.cartList.forEach((item: ProductExtended) => {
			let price = 0;
			item.discount ?
				price = item.product.price - (item.product.price * (item.discount / 100)) :
				price = item.product.price;
			this.Data.totalPrice = this.Data.totalPrice + price * item.cartCount;
			this.Data.totalCartCount = this.Data.totalCartCount + item.cartCount;
		});
	}

	public addToFavorites(product: Product) {
		let messageKey: string, status: string;

		if (this.Data.favorites.find((item: Product) => item.id == product.id)) {
			messageKey = "SNACKBAR.FAVORITE.ALREADY"
			status = 'error';
		} else {
			this.Data.favorites.push(product);
			messageKey = "SNACKBAR.FAVORITE.ADD"
			status = 'success';
		}
		this.translateService.get(messageKey).subscribe((message: string) => {
			this.snackBar.open(message, '×', {
				verticalPosition: 'top',
				duration: 3000,
				direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr',
				panelClass: [status],
			});
		});
	}

	public openDialog(component: any, data: any, panelClass: any) {
		return this.dialog.open(component, {
			data: data,
			panelClass: panelClass,
			autoFocus: false,
			direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr',
		});
	}

	public openConfirmDialog(title: string, message: string) {
		const dialogData = new ConfirmDialogModel(title, message);
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			maxWidth: '400px',
			data: dialogData,
		});
		return dialogRef;
	}

	public openAlertDialog(message: string) {
		const dialogRef = this.dialog.open(AlertDialogComponent, {
			maxWidth: '400px',
			data: message,
		});
		return dialogRef;
	}

	public makeReservation(dialogComponent: any, data: any, onDialog: boolean = false) {
		if (onDialog) {
			const dialogRef = this.openDialog(dialogComponent, null, 'theme-dialog');
			dialogRef.afterClosed().subscribe((data) => {
				if (data) {
					this.showReservationMessage(data);
				}
			});
		} else {
			this.showReservationMessage(data);
		}
	}
	private showReservationMessage(data: any) {
		this.snackBar.open(
			'Dear ' +
			data.fullName +
			', thank you for your reservation! Your reservation at Popino on the ' +
			this.datePipe.transform(data.date, 'dd-MM-yyyy') +
			' at ' +
			data.time +
			' for ' +
			data.guests +
			' people will review by our team and someone will be in touch soon.',
			'×',
			{ panelClass: 'success', verticalPosition: 'top', duration: 9000 }
		);
	}

	public getTranslateValue(key: string, param: string = '') {
		let value = null;
		this.translateService.get(key, { param: param }).subscribe((res: string) => {
			value = res;
		});
		return value;
	}

	public filterData(data: ProductExtended[], categoryId: string | null, sort?: string, page?: number, perPage?: number) {
		if (categoryId) {
			data = data.filter( (item: ProductExtended) => item.product.category.id == categoryId);
		}

		//for show more properties mock data
		// for (let index = 0; index < 2; index++) {
		//   data = data.concat(data);
		// }

		this.sortData(data, sort);
		return this.paginator(data, page, perPage);
	}

	public sortData(data: ProductExtended[], sort?: string) {
		if (sort) {
			switch (sort) {
				case 'POPULAR':
					data = data.sort((a: ProductExtended, b: ProductExtended) => {
						if (a.ratingsValue / a.ratingsCount < b.ratingsValue / b.ratingsCount) {
							return 1;
						}
						if (a.ratingsValue / a.ratingsCount > b.ratingsValue / b.ratingsCount) {
							return -1;
						}
						return 0;
					});
					break;
				case 'PRICE_LTH':
					data = data.sort((a: ProductExtended, b: ProductExtended) => {
						if (a.product.price > b.product.price) {
							return 1;
						}
						if (a.product.price < b.product.price) {
							return -1;
						}
						return 0;
					});
					break;
				case 'PRICE_HTL':
					data = data.sort((a: ProductExtended, b: ProductExtended) => {
						if (a.product.price < b.product.price) {
							return 1;
						}
						if (a.product.price > b.product.price) {
							return -1;
						}
						return 0;
					});
					break;
				default:
					break;
			}
		}
		return data;
	}

	public paginator(items: any, page?: any, perPage?: any) {
		var page = page || 1,
			perPage = perPage || 4,
			offset = (page - 1) * perPage,
			paginatedItems = items.slice(offset).slice(0, perPage),
			totalPages = Math.ceil(items.length / perPage);
		return {
			data: paginatedItems,
			pagination: {
				page: page,
				perPage: perPage,
				prePage: page - 1 ? page - 1 : null,
				nextPage: totalPages > page ? page + 1 : null,
				total: items.length,
				totalPages: totalPages,
			},
		};
	}

	public getCountries(): Observable<Country[]> {
		// public getCountries() {
		return this.http.get<Country[]>(this.url + 'countries.json');
	}

	public getTestimonials() {
		return [
			{
				text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.',
				author: 'Mr. Adam Sandler',
				position: 'General Director',
				image: 'assets/images/profile/adam.jpg',
			},
			{
				text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.',
				author: 'Ashley Ahlberg',
				position: 'Housewife',
				image: 'assets/images/profile/ashley.jpg',
			},
			{
				text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.',
				author: 'Bruno Vespa',
				position: 'Blogger',
				image: 'assets/images/profile/bruno.jpg',
			},
			{
				text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.',
				author: 'Mrs. Julia Aniston',
				position: 'Marketing Manager',
				image: 'assets/images/profile/julia.jpg',
			},
		];
	}

	public getChefs() {
		return [
			{
				id: 1,
				fullName: 'Andy Warhol',
				position: 'Head of Chef',
				desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',
				organization: 'Restaurant',
				email: 'andy.w@mox.com',
				phone: '(212) 457-2308',
				social: {
					facebook: 'andy.warhol',
					twitter: 'andy.warhol',
					linkedin: 'andy.warhol',
					instagram: 'andy.warhol',
					website: 'https://andy.warhol.com',
				},
				ratingsCount: 4,
				ratingsValue: 400,
				image: 'assets/images/chefs/1.jpg',
			},
			{
				id: 2,
				fullName: 'Lusia Manuel',
				position: 'Assistant Chef',
				desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',
				organization: 'Restaurant',
				email: 'lusia.m@mox.com',
				phone: '(224) 267-1346',
				social: {
					facebook: 'lusia.manuel',
					twitter: 'lusia.manuel',
					linkedin: 'lusia.manuel',
					instagram: 'lusia.manuel',
					website: 'https://lusia.manuel.com',
				},
				ratingsCount: 6,
				ratingsValue: 480,
				image: 'assets/images/chefs/2.jpg',
			},
			{
				id: 3,
				fullName: 'Michael Blair',
				position: 'Intern Chef',
				desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',
				organization: 'Restaurant',
				email: 'michael.b@mox.com',
				phone: '(267) 388-1637',
				social: {
					facebook: 'michael.blair',
					twitter: 'michael.blair',
					linkedin: 'michael.blair',
					instagram: 'michael.blair',
					website: 'https://michael.blair.com',
				},
				ratingsCount: 4,
				ratingsValue: 400,
				image: 'assets/images/chefs/3.jpg',
			},
			{
				id: 4,
				fullName: 'Tereza Stiles',
				position: 'Assistant Chef',
				desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',
				organization: 'Restaurant',
				email: 'tereza.s@mox.com',
				phone: '(214) 617-2614',
				social: {
					facebook: 'tereza.stiles',
					twitter: 'tereza.stiles',
					linkedin: 'tereza.stiles',
					instagram: 'tereza.stiles',
					website: 'https://tereza.stiles.com',
				},
				ratingsCount: 4,
				ratingsValue: 380,
				image: 'assets/images/chefs/4.jpg',
			},
			{
				id: 5,
				fullName: 'Michelle Ormond',
				position: 'Head of Chef',
				desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',
				organization: 'Restaurant',
				email: 'michelle.o@mox.com',
				phone: '(267) 388-1637',
				social: {
					facebook: 'michelle.ormond',
					twitter: 'michelle.ormond',
					linkedin: 'michelle.ormond',
					instagram: 'michelle.ormond',
					website: 'https://michelle.ormond.com',
				},
				ratingsCount: 6,
				ratingsValue: 480,
				image: 'assets/images/chefs/5.jpg',
			},
		];
	}

	public getAwards() {
		return [
			{ name: 'award-1', image: 'assets/images/awards/1.png' },
			{ name: 'award-2', image: 'assets/images/awards/2.png' },
			{ name: 'award-3', image: 'assets/images/awards/3.png' },
			{ name: 'award-4', image: 'assets/images/awards/4.png' },
			{ name: 'award-5', image: 'assets/images/awards/5.png' },
			{ name: 'award-6', image: 'assets/images/awards/6.png' },
			{ name: 'award-7', image: 'assets/images/awards/7.png' },
		];
	}

	public getDeliveryMethods() {
		return [
			{ value: 'free', name: 'Free Delivery', desc: '$0.00 / Delivery in 7 to 14 business Days' },
			{ value: 'standard', name: 'Standard Delivery', desc: '$7.99 / Delivery in 5 to 7 business Days' },
			{ value: 'express', name: 'Express Delivery', desc: '$29.99 / Delivery in 1 business Days' },
		];
	}

	public getMonths() {
		return [
			{ value: '01', name: 'January' },
			{ value: '02', name: 'February' },
			{ value: '03', name: 'March' },
			{ value: '04', name: 'April' },
			{ value: '05', name: 'May' },
			{ value: '06', name: 'June' },
			{ value: '07', name: 'July' },
			{ value: '08', name: 'August' },
			{ value: '09', name: 'September' },
			{ value: '10', name: 'October' },
			{ value: '11', name: 'November' },
			{ value: '12', name: 'December' },
		];
	}

	public getYears() {
		const startYear = new Date().getFullYear();
		let years = Array();
		for (let i = 0; i <= 10; i++) {
			years.push(startYear + i);
		}
		return years;
	}

	public shuffleArray(array: any) {
		let currentIndex = array.length,
			temporaryValue,
			randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	public convertImgToBase64(url: string, callback: any) {
		let xhr = new XMLHttpRequest();
		xhr.onload = function () {
			let reader = new FileReader();
			reader.onloadend = function () {
				callback(reader.result);
			};
			reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	}

	private mailApi = 'https://mailthis.to/codeninja';
	public PostMessage(input: any) {
		return this.http.post(this.mailApi, input, { responseType: 'text' }).pipe(
			map(
				(response: any) => {
					if (response) {
						return response;
					}
				},
				(error: any) => {
					return error;
				}
			)
		);
	}
}
