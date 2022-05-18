import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Subject } from 'rxjs';
import { IUser } from '@core/models/User';

@Injectable({
	providedIn: 'root'
})
export class CurrentUserService {
	public currentUser$ = new Subject<IUser>();
	public isUserLogin$ = new BehaviorSubject<boolean>(false);

	constructor(private afAuth: AngularFireAuth) {
		this.afAuth.user.subscribe(user => {
			// console.log('curUser: ', user);
			if (!user) {
				this.currentUser$.next({
					roleId: '0',
					role: { name: 'guest' }
				});
				this.isUserLogin$.next(false);
			} else {
				// TODO: get users data from firestore database
				// and add it to currentUser$ value

				// temporarily...
				this.currentUser$.next({
					id: user.uid,
					email: user.email,
					firstName: 'firstName',
					lastName: 'lastName',
					password: 'password',
					roleId: '1',
					role: { name: 'user' }
				});
				this.isUserLogin$.next(true);
			}
		});
	}
}
