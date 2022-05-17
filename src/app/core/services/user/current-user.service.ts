import { Injectable } from '@angular/core';
import { IUser } from '@core/models/User';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Subject } from 'rxjs';
// import { role } from '@core/models/test-data';

@Injectable({
	providedIn: 'root'
})
export class CurrentUserService {
	username = 'Example';

	user: IUser | any = {
		id: 'd5lRYhxnFibepXPUlCEp',
		role: { name: 'user', permissions: ['fasd', 'dsad'] }
	};

	public currentUser$ = new Subject<IUser>();
	public isUserLogin$ = new BehaviorSubject<boolean>(false);

	constructor(private afAuth: AngularFireAuth) {
		this.afAuth.user.subscribe(user => {
			// console.log('curUser: ', user);
			if (!user) {
				this.currentUser$.next({
					id: '1',
					role: {
						name: 'guest',
						// permissions: [],
						hasUsers: false,
						canModifyCategory: false,
						canModifyPost: false
					},
					roleId: '0'
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
					role: {
						name: 'user',
						hasUsers: false,
						canModifyCategory: false,
						canModifyPost: false
					},
					roleId: '1'
				});
				this.isUserLogin$.next(true);
			}
		});
	}
}
