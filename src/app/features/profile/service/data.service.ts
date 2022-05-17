import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IRole } from '@core/models/Role';
import { IUser } from '@core/models/User';
import { Observable } from 'rxjs';
import { FirebaseCrudService } from '../../../core/services/firebaseCrud.service';

@Injectable()
export class DataService extends FirebaseCrudService<IUser, string, IRole> {
	constructor(protected _firebase: AngularFirestore) {
		super('users', 'role', _firebase);
	}

	getUser(id: string): Observable<IUser> {
		return this.getDocSnapshot(id);
	}

	updateUser(id: string, content: IUser): Promise<IUser | void> {
		return this.updateDoc(id, content);
	}
}
