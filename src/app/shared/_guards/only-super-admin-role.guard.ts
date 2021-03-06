import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class OnlySuperAdminRoleGuard implements CanActivate {
	constructor(
		private currentUserService: CurrentUserService,
		private router: Router
	) {}

	canActivate(): Observable<boolean> | boolean {
		return this.currentUserService.currentUser$.pipe(
			map(curUser => {
				if (curUser.roleId === '0') {
					return true;
				} else {
					this.router.navigateByUrl('/main');
					return false;
				}
			})
		);
	}
}
