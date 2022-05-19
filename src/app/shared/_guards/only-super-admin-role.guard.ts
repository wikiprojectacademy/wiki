import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { SnackBarService } from '@shared/services/snackbar.service';
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class OnlySuperAdminRoleGuard implements CanActivate, OnInit, OnDestroy {
	curRoleId: string;
	private subscription: Subscription;

	constructor(
		private currentUserService: CurrentUserService,
		private routes: Router,
		private snackBarService: SnackBarService
	) {}

	canActivate() {
		if (this.curRoleId == '0') {
			return true;
		} else {
			this.routes.navigateByUrl('/main');
			this.snackBarService.openSnackBar(
				'This page available only for superAdmin',
				'Got it',
				2000
			);
			return false;
		}
	}

	ngOnInit(): void {
		this.subscription = this.currentUserService.currentUser$.subscribe(
			curUser => (this.curRoleId = curUser.roleId)
		);
	}

	ngOnDestroy() {
		console.log('Unsubscribe');
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
