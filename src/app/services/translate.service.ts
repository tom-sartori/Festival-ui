import { Injectable } from '@angular/core';
import { TranslateService as ExternalTranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TranslateService {
	constructor(public externalTranslateService: ExternalTranslateService) {}

	public getTranslatedValue(key: string, param: string = ''): string | null {
		let value: string | null = null;
		this.getSyncTranslatedValue(key, param).subscribe((res: string | null) => {
			value = res;
		});
		return value;
	}

	public getSyncTranslatedValue(key: string, param: string = ''): Observable<string | null> {
		return this.externalTranslateService.get(key, { param: param });
	}

	public getTranslatedList(list: string[]): string[] {
		let translatedList: string[] = [];
		list.forEach((element: string) => {
			let translated = this.getTranslatedValue(element);
			translatedList.push(translated ? translated : element);
		});
		return translatedList;
	}
}
