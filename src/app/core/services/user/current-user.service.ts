import { Injectable } from '@angular/core';
import {
	BehaviorSubject,
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
	public currentUser$: Observable<IUser>;
	public isUserLogin$: Observable<boolean>;
	public isAdmin: BehaviorSubject<boolean>;
	public isDatabaseInitialized: BehaviorSubject<boolean>;

	constructor(
		private afAuth: AngularFireAuth,
		private userFireStore: UserFirebaseService
	) {
		this.isAdmin = new BehaviorSubject<boolean>(false);
		this.isDatabaseInitialized = new BehaviorSubject<boolean>(true);
		this.initUser();
	}

	initUser(): void {
		this.currentUser$ = this.afAuth.user.pipe(
			switchMap(user =>
				user
					? this.userFireStore.getUserData(user.uid)
					: of({ roleId: '' } as IUser)
			),
			shareReplay(1)
		);

		this.isUserLogin$ = this.currentUser$.pipe(
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
	}
}
