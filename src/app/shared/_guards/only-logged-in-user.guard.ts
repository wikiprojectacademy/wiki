import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { SnackBarService } from '@shared/services/snackbar.service';

@Injectable({
	providedIn: 'root'
})
export class OnlyLoggedInUserGuard implements CanActivate {
	curRole: string;

	constructor(
		private currentUserService: CurrentUserService,
		private routes: Router,
		private snackBarService: SnackBarService
	) {
		this.currentUserService.currentUser$.subscribe(
			curUser => (this.curRole = curUser.role.name)
		);
	}

	canActivate() {
		if (
			// this.currentUserService.user.role.name !== 'guest'
			this.curRole !== 'guest'
		) {
			return true;
		} else {
			this.routes.navigateByUrl('/main');
			this.snackBarService.openSnackBar(
				'This page available only for logged in users!',
				'Got it',
				2000
			);
			return false;
		}
	}
}
