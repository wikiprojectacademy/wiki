import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, map, of, shareReplay, switchMap } from 'rxjs';
import { IUser } from '@core/models/User';
import { UserFirebaseService } from '../firebase/firebase-entities/userFirebase.service';

@Injectable({
	providedIn: 'root'
})
export class CurrentUserService {
	public currentUser$ = this.afAuth.user.pipe(
		switchMap(user =>
			user
				? this.userFireStore
						.getUserDataByEmail(user.email)
						.pipe(catchError(() => of({ roleId: '' } as IUser)))
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
