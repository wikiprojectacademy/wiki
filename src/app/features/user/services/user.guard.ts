import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { SnackBarService } from '@shared/services/snackbar.service';

@Injectable()
export class UserGuard implements CanActivate {
	constructor(
		private snackBarService: SnackBarService,
		private currentUserService: CurrentUserService,
		private routes: Router
	) {}

	canActivate() {
		if (this.currentUserService.user.role.name == 'superAdmin') {
			return true;
		} else {
			this.routes.navigateByUrl('/main');
			// this.snackBarService.openSnackBar(
			// 'this path availible only for super Admin '
			// )
			// return false;
			return true;
		}
	}
}
