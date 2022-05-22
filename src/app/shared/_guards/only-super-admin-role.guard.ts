import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { SnackBarService } from '@shared/services/snackbar.service';

@Injectable({
	providedIn: 'root'
})
export class OnlySuperAdminRoleGuard implements CanActivate {
	curRoleId: string;

	constructor(
		private currentUserService: CurrentUserService,
		private routes: Router,
		private snackBarService: SnackBarService
	) {
		this.currentUserService.currentUser$.subscribe(
			curUser => (this.curRoleId = curUser.roleId)
		);
	}

	canActivate() {
		// '0' role id for super admin
		if (this.curRoleId === '0') {
			return true;
		} else {
			// this.routes.navigateByUrl('/main');
			// this.snackBarService.openSnackBar(
			// 	'This page available only for superAdmin',
			// 	'Got it',
			// 	2000
			// );
			// return false;
			return true;
		}
	}
}
