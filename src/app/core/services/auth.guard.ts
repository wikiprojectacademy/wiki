import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from './user/current-user.service';
@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	user: any;
	constructor(private currentUserService: CurrentUserService) {
		this.user = this.currentUserService.user;
	}

	canActivate() {
		// route: ActivatedRouteSnapshot,
		// state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (
			(this.user.isLoggedIn === true && this.user.role.type === 'admin') ||
			this.user.role.type === 'user'
		) {
			return true;
		}
		return false;
	}
}
