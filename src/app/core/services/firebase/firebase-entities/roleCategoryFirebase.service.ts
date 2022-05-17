import { Injectable } from '@angular/core';
import { FirebaseCrudService } from '@core/services/firebase/firebase-api/firebaseCrud.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IRoleCategoryPair } from '@core/models/RoleCategoryPair';
import { IRole } from '@core/models/Role';

@Injectable({
	providedIn: 'root'
})
export class RoleCategoryFirebaseService extends FirebaseCrudService<
	IRoleCategoryPair,
	string,
	any
> {
	constructor(protected _firebase: AngularFirestore) {
		super('junction_role_category', 'none', _firebase);
	}

	addRoleCategoryEntry(relation: IRoleCategoryPair): Promise<string> {
		return this.addDocWithAutoId(relation);
	}
}
