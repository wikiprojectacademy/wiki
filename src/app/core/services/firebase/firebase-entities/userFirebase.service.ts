import { Injectable } from '@angular/core';
import { FirebaseCrudService } from '@core/services/firebase/firebase-api/firebaseCrud.service';
import { IUser } from '@core/models/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
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

	updateUser(id: string, content: IUser) {
		return this.updateDoc(id, content);
	}

	getUserData(id: string) {
		return this.getDocSnapshot(id);
	}

	getUsers$(): Observable<IUser[]> {
		return this.getCollection();
	}

	addUserWithCustomId(id: string, user: IUser): Promise<void> {
		return this.addDoc(id, user);
	}
}
