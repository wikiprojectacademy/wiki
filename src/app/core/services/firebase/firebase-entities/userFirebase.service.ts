import { Injectable } from '@angular/core';
import { FirebaseCrudService } from '@core/services/firebase/firebase-api/firebaseCrud.service';
import { IUser } from '@core/models/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { lastValueFrom, map, Observable, take } from 'rxjs';
import firebase from 'firebase/compat';
import WhereFilterOp = firebase.firestore.WhereFilterOp;

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
		return this.addDocWithAutoId(user);
	}

	updateUser(id: string, content: IUser): Promise<void> {
		return this.updateDoc(id, content);
	}

	deleteUser(id: string): Promise<void> {
		return this.deleteDoc(id);
	}

	getUserData(id: string): Observable<IUser> {
		return this.getDocSnapshot(id);
	}

	getUsers$(): Observable<IUser[]> {
		return this.getCollection();
	}

	getUsersWhere(
		fieldName: string,
		operationStr: WhereFilterOp = '==',
		value: string
	): Observable<IUser[]> {
		return this.firebase
			.collection<IUser>(this.base, ref =>
				ref.where(fieldName, operationStr, value)
			)
			.valueChanges();
	}

	getUsersWithRoleId(id: string): Observable<IUser[]> {
		return this.getUsersWhere('roleId', '==', id);
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
			}),
			take(1)
		);
	}
}
