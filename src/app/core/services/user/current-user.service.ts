import { Injectable } from '@angular/core';
import { IUser } from '@core/models/User';

@Injectable({
	providedIn: 'root'
})
export class CurrentUserService {
	username = 'Example';
	//
	user: IUser | any = {
		isLoggedIn: true,
		role: { type: 'user', permissions: ['fasd', 'dsad'] }
	};
	//
	constructor() {}

	getUsername(): string {
		return this.username;
	}
}
