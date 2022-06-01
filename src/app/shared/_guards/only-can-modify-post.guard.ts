import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RoleFirebaseService } from '@core/services/firebase/firebase-entities/roleFirebase.service';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class OnlyCanModifyPostGuard implements CanActivate {
	curRoleId: string;

	constructor(
		private router: Router,
		private currentUserService: CurrentUserService,
		private roleFirebaseService: RoleFirebaseService
	) {}

	canActivate(): Observable<boolean> {
		return this.currentUserService.currentUser$.pipe(
			switchMap(curUser => {
				this.curRoleId = curUser.roleId;
				return this.roleFirebaseService.getRole(this.curRoleId).pipe(
					map(roleObj => {
						if (!roleObj.canModifyPost) {
							this.router.navigateByUrl('/main');
						}
						return roleObj.canModifyPost;
					})
				);
			})
		);
	}
}
