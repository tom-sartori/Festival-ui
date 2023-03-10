import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private router: Router
	) {
	}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (localStorage.getItem('currentUser')) {
			// logged in so return true
			return true;
		}

		// not logged in so redirect to login page with the return url
		this.router.navigate(['/login']).then();
		return false;
	}
}
