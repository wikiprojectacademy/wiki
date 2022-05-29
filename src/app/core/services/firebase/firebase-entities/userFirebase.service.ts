import { Injectable } from '@angular/core';
import { FirebaseCrudService } from '@core/services/firebase/firebase-api/firebaseCrud.service';
import { IUser } from '@core/models/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { lastValueFrom, map, Observable, take } from 'rxjs';
import { IRole } from '@core/models/Role';

@Injectable({
	providedIn: 'root'
})
export class UserFirebaseService extends FirebaseCrudService<
	IUser,
	string,
	any
> {
	constructor(protected _firebase: AngularFirestore) {
		super('users', 'none', _firebase);
	}

	addUser(user: IUser): Promise<string> {
		// TODO: Add here logic, that update hasUsers, property, for Role after adding user
		return this.addDocWithAutoId(user);
	}

	addUserWithRole(userId: string, user: IUser, role: IRole) {}

	updateUser(id: string, content: IUser): Promise<void> {
		return this.updateDoc(id, content);
	}

	getUserData(id: string): Observable<IUser> {
		return this.getDocSnapshot(id);
	}

	getUsers$(): Observable<IUser[]> {
		return this.getCollection();
	}

	addUserWithCustomId(id: string, user: IUser): Promise<void> {
		return this.addDoc(id, user);
	}

	getUserByEmail(email: string): Promise<IUser> {
		const userFromDatabase$ = this.getUsers$().pipe(
			map(data => {
				const user = data.find(user => user.email === email);
				if (!user) {
					throw Error('User not found in database');
				}

				return user;
			}),
			take(1)
		);

		return lastValueFrom(userFromDatabase$).then((user: IUser) => user);
	}

	getUserDataByEmail(email: string): Observable<IUser> {
		return this.getUsers$().pipe(
			map(data => {
				const user = data.find(user => user.email === email);
				if (!user) {
					throw Error('User not found in database');
				}

				return user;
			})
			// take(1)
		);
	}
}
