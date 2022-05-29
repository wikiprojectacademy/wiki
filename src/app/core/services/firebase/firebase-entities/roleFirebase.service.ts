import { Injectable } from '@angular/core';
import { FirebaseCrudService } from '@core/services/firebase/firebase-api/firebaseCrud.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IRole } from '@core/models/Role';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RoleFirebaseService extends FirebaseCrudService<
	IRole,
	string,
	any
> {
	constructor(protected _firebase: AngularFirestore) {
		super('roles', 'none', _firebase);
	}

	addRole(role: IRole): Promise<string> {
		return this.addDocWithAutoId(role);
	}

	addRoleWithCustomId(id: string, role: IRole): Promise<void> {
		return this.addDoc(id, role);
	}

	editRole(id: string, role: IRole): Promise<void> {
		return this.updateDoc(id, role);
	}

	getRole(id: string): Observable<IRole> {
		return this.getDoc(id);
	}

	getRoles(): Observable<IRole[]> {
		return this.getCollection();
	}

	deleteRole(id: string): Promise<void> {
		return this.deleteDoc(id);
	}
}
