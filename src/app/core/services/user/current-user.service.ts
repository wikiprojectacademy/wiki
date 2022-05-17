import { Injectable } from '@angular/core';
import { IUser } from '@core/models/User';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Subject } from 'rxjs';
import { role } from '@core/models/test-data';

@Injectable({
	providedIn: 'root'
})
export class CurrentUserService {
	username = 'Example';

	user: IUser | any = {
		isLoggedIn: true,
		role: { type: 'user', permissions: ['fasd', 'dsad'] }
	};

	public currentUser$ = new Subject<IUser>();
	public isUserLogin$ = new BehaviorSubject<boolean>(false);

	constructor(private afAuth: AngularFireAuth) {
		this.afAuth.user.subscribe(user => {
			// console.log('curUser: ', user);
			if (!user) {
				this.currentUser$.next({
					id: '1',
					role: { type: 'guest', permissions: [] }
				});
				this.isUserLogin$.next(false);
			} else {
				// todo get users data from firestore database
				// and add it to currentUser$ value

				// temporarily...
				this.currentUser$.next({
					id: user.uid,
					email: user.email,
					firstName: 'firstName',
					lastName: 'lastName',
					password: 'password',
					role: { type: 'user', permissions: [] }
				});
				this.isUserLogin$.next(true);
			}
		});
	}
}
