import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RoleFirebaseService } from '@core/services/firebase/firebase-entities/roleFirebase.service';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class OnlyCanModifyCategoryGuard implements CanActivate {
	constructor(
		private router: Router,
		private currentUserService: CurrentUserService,
		private roleFirebaseService: RoleFirebaseService
	) {}

	canActivate(): Observable<boolean> {
		return this.currentUserService.currentUser$.pipe(
			switchMap(curUser => {
				return this.roleFirebaseService.getRole(curUser.roleId).pipe(
					map(roleObj => {
						if (!roleObj.canModifyCategory) {
							this.router.navigateByUrl('/main');
						}
						return roleObj.canModifyCategory;
					})
				);
			})
		);
	}
}
