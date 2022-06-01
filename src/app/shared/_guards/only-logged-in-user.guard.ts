import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class OnlyLoggedInUserGuard implements CanActivate {
	constructor(
		private currentUserService: CurrentUserService,
		private router: Router
	) {}

	canActivate(): Observable<boolean> {
		return this.currentUserService.isUserLogin$.pipe(
			map(isLoggedIn => {
				if (!isLoggedIn) {
					this.router.navigateByUrl('/main');
				}
				return isLoggedIn;
			})
		);
	}
}
