import { Injectable } from '@angular/core';
import {
	BehaviorSubject,
	catchError,
	map,
	Observable,
	of,
	shareReplay,
	switchMap,
	tap
} from 'rxjs';
import { IUser } from '@core/models/User';
import { UserFirebaseService } from '../firebase/firebase-entities/userFirebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
	providedIn: 'root'
})
export class CurrentUserService {
	public currentUser$: Observable<IUser> = this.afAuth.user.pipe(
		switchMap(user =>
			user
				? this.userFireStore
						.getUserDataByEmail(user.email)
						.pipe(catchError(() => of({ roleId: '' } as IUser)))
				: of({ roleId: '' } as IUser)
		),
		shareReplay(1)
	);
	public isUserLogin$: Observable<boolean> = this.currentUser$.pipe(
		tap(userData => {
			if (userData?.roleId !== '' && userData?.isAdmin) {
				this.isAdmin.next(true);
				this.isDatabaseInitialized.next(userData?.isDatabaseInitialized);
			} else {
				this.isAdmin.next(false);
			}
		}),
		map(user => user?.roleId !== '')
	);
	public isAdmin: BehaviorSubject<boolean>;
	public isDatabaseInitialized: BehaviorSubject<boolean>;

	constructor(
		private afAuth: AngularFireAuth,
		private userFireStore: UserFirebaseService
	) {
		this.isAdmin = new BehaviorSubject<boolean>(false);
		this.isDatabaseInitialized = new BehaviorSubject<boolean>(true);
	}
}
