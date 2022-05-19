import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Subject } from 'rxjs';
import { IUser } from '@core/models/User';
import { UserFirebaseService } from '../firebase/firebase-entities/userFirebase.service';

@Injectable({
	providedIn: 'root'
})
export class CurrentUserService {
	public currentUser$ = new Subject<IUser>();
	public isUserLogin$ = new BehaviorSubject<boolean>(false);

	constructor(
		private afAuth: AngularFireAuth,
		private userFireStore: UserFirebaseService
	) {
		this.afAuth.user.subscribe(user => {
			if (!user) {
				this.currentUser$.next({
					roleId: '0'
				});
				this.isUserLogin$.next(false);
			} else {
				this.userFireStore.getUserData(user.uid).subscribe(user => {
					this.currentUser$.next(user);
					this.isUserLogin$.next(true);
				});
			}
		});
	}
}
