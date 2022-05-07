import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CurrentUserService {
	username = 'Example';

	constructor() {}

	getUsername(): string {
		return this.username;
	}
}
