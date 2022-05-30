import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
			tap(user => {
				if (user?.roleId !== '' && user?.isAdmin) {
					this.isAdmin.next(true);
					this.isDatabaseInitialized.next(user?.isDatabaseInitialized);
				} else {
					this.isAdmin.next(false);
				}
			}),
			map(user => user?.roleId !== '')
		);
	}
}
