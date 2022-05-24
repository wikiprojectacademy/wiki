import { Injectable } from '@angular/core';
import { FirebaseCrudService } from '@core/services/firebase/firebase-api/firebaseCrud.service';
import { IUser } from '@core/models/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
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

	updateUser(id: string, content: IUser) {
		return this.updateDoc(id, content);
	}

	deleteUser(id: string) {
		return this.deleteDoc(id);
	}

	getUserData(id: string) {
		return this.getDocSnapshot(id);
	}

	getUsers$(): Observable<IUser[]> {
		return this.getCollection();
	}

	getUsersWithRoleId(id) {
		return this.getUsersWhere('roleId', '==', id);
	}

	addUserWithCustomId(id: string, user: IUser): Promise<void> {
		return this.addDoc(id, user);
	}

	getUsersWhere(
		fieldName: string,
		operationStr: WhereFilterOp = '==',
		value: any
	): any {
		return this.firebase
			.collection<IUser>(this.base, ref =>
				ref.where(fieldName, operationStr, value)
			)
			.valueChanges();
	}
}
