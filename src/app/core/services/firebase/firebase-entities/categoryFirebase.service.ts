import { FirebaseCrudService } from '@core/services/firebase/firebase-api/firebaseCrud.service';
import { ICategory } from '@core/models/Category';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { ISubCategory } from '@core/models/SubCategory';
import { map, Observable } from 'rxjs';

/**
 * Small example of usage Firebase CRUD service for operations with categories
 */
@Injectable({
	providedIn: 'root'
})
export class CategoryFirebaseService extends FirebaseCrudService<
	ICategory,
	string,
	ISubCategory
> {
	categories$: Observable<ICategory[]>;

	constructor(protected _firebase: AngularFirestore) {
		super('categories', 'subCategories', _firebase);
	}

	getCategory(id: string): Observable<ICategory> {
		return this.getDocSnapshot(id);
	}

	getSubCategories(id: string) {
		return this.getSubCollection(id);
	}

	getCategoriesByIds(ids: string[]): Observable<ICategory[]> {
		return this.getCollectionSnapshot().pipe(
			map(item => {
				return item.filter(item => ids.includes(item.id));
			})
		);
	}

	getStreamCategories(): Observable<ICategory[]> {
		return this.getCollection();
	}

	getStreamSubCategories(
		parentId: string,
		subCollectionId: string
	): Observable<ISubCategory> {
		return this.getDocFromSubCollection(parentId, subCollectionId);
	}

	getCategories(): Observable<ICategory[]> {
		return this.getCollection();
	}

	async addCategory(category: ICategory) {
		return await this.addDocWithAutoId(category)
			.then(createdID => {
				return Promise.resolve(createdID);
			})
			.catch(error => console.error(error));
	}

	addCategoryWithId(id: string, category: ICategory) {
		return this.addDoc(id, category);
	}

	addSubCategory(categoryId: string, subCategory: ISubCategory) {
		this.addDocToSubCollection(categoryId, subCategory);
	}

	addInSubCategoryWithCustomId(
		categoryId: string,
		subCategoryId: string,
		subCategory: Partial<ISubCategory>
	) {
		this.addDocToSubCollectionWithCustomId(
			categoryId,
			subCategoryId,
			subCategory
		);
	}
}
