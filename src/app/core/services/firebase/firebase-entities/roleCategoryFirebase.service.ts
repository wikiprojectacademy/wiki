import { Injectable } from '@angular/core';
import { FirebaseCrudService } from '@core/services/firebase/firebase-api/firebaseCrud.service';
import {
	AngularFirestore,
	QuerySnapshot
} from '@angular/fire/compat/firestore';
import { IRoleCategoryPair } from '@core/models/RoleCategoryPair';
import { map, Observable } from 'rxjs';

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

	getRoleCategoryEntry(id: string): Observable<IRoleCategoryPair> {
		return this.getDoc(id);
	}

	getRoleCategoryEntries(): Observable<IRoleCategoryPair[]> {
		return this.getCollection();
	}

	getRoleCategoryEntriesWithIds(): Observable<IRoleCategoryPair[]> {
		return this.getCollectionWithIds();
	}

	getRoleCategoriesByRoleId(id): Observable<IRoleCategoryPair[]> {
		return this.firebase
			.collection<IRoleCategoryPair>(this.base, ref =>
				ref.where('roleId', '==', id)
			)
			.valueChanges();
	}

	getRoleCategoriesId(roleId, categoryId): Observable<IRoleCategoryPair[]> {
		return this.getCollectionSnapshot().pipe(
			map(item => {
				return item.filter(
					item => item.categoryId == categoryId && item.roleId == roleId
				);
			})
		);
	}

	getRoleCategoryEntriesByRoleId(
		roleId: string
	): Promise<QuerySnapshot<IRoleCategoryPair>> {
		return this.getDocumentsWherePromise('roleId', '==', roleId);
	}

	getRoleCategoryEntriesByCategoryId(
		categoryId: string
	): Promise<QuerySnapshot<IRoleCategoryPair>> {
		return this.getDocumentsWherePromise('categoryId', '==', categoryId);
	}
}
