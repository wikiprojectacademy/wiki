import { FirebaseCrudService } from '@core/services/firebaseCrud.service';
import { ICategory } from '@core/models/Category';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { ISubCategory } from '@core/models/SubCategory';
import { Observable } from 'rxjs';

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

	getStreamCategories(): Observable<ICategory[]> {
		return this.getCollection();
	}

	getCategories() {
		this.getCollection().subscribe(categories => console.log(categories));
	}

	addCategory(category: ICategory) {
		this.addDocWithAutoId(category).then(() => {
			console.log('category added');
		});
	}

	addSubcategory(categoryId: string, subCategory: ISubCategory) {
		this.addDocToSubCollection(categoryId, subCategory);
	}
}
