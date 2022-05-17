import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from '@core/services/user/current-user.service';

@Injectable()
export class ProfileGuard implements CanActivate {
	constructor(
		private currentUserService: CurrentUserService,
		private routes: Router
	) {}

	canActivate() {
		if (this.currentUserService.user.role.type !== 'guest') {
			return true;
		} else {
			this.routes.navigateByUrl('/main');
			return false;
		}
	}

	// canActivateChild() {
	// 	if (this.currentUserService.user.role.type !== 'guest') {
	// 		return true;
	// 	} else {
	// 		this.routers.navigateByUrl('/main')
	// 		return false;
	// 	}
	// }
}
