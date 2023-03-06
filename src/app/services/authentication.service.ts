import { Injectable } from '@angular/core';
import { AppService } from '@services/app.service';
import { map } from 'rxjs/operators';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Token } from '@models/token.model';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private dataPath: string = '/user';

	constructor(
		private appService: AppService
	) {
	}

	public register(user: User): Observable<HttpResponse<void>> {
		const headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};

		return this.appService.http.post<any>(
			this.appService.apiUrl + '/user/register',
			user,
			{ headers }
		);
	}

	public login(email: string, password: string): Observable<HttpResponse<Token>> {
		const headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};
		return this.appService.http.post<Token>(
			this.appService.apiUrl + this.dataPath + '/login',
			{ email, password },
			{
				headers,
				observe: 'response'
			}
		)
			.pipe(map(response => {
				// login successful if there's a jwt token in the response
				if (response.body && response.body.token) {
					// store user details and jwt token in local storage to keep user logged in between page refreshes
					localStorage.setItem('currentUser', response.body.token);
				}

				return response;
			}));
	}

	public logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
	}


	public isLoggedIn(): boolean {
		return !!localStorage.getItem('currentUser');
	}

	public getCurrentToken(): string | null {
		return localStorage.getItem('currentUser');
	}
}
