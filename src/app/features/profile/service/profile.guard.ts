import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CurrentUserService } from '@core/services/user/current-user.service';

@Injectable()
export class ProfileGuard implements CanActivate {
	constructor(private currentUserService: CurrentUserService) {}
	canActivate() {
		if (this.currentUserService.user.role.type !== 'guest') {
			return true;
		} else return false;
	}
}
