import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, of, shareReplay, switchMap } from 'rxjs';
import { IUser } from '@core/models/User';
import { UserFirebaseService } from '../firebase/firebase-entities/userFirebase.service';

@Injectable({
	providedIn: 'root'
})
export class CurrentUserService {
	public currentUser$ = this.afAuth.user.pipe(
		switchMap(user =>
			user
				? this.userFireStore.getUserData(user.uid)
				: of({ roleId: '' } as IUser)
		),
		shareReplay(1)
	);

	public isUserLogin$ = this.currentUser$.pipe(map(user => user.roleId !== ''));

	constructor(
		private afAuth: AngularFireAuth,
		private userFireStore: UserFirebaseService
	) {}
}
