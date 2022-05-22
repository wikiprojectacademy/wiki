import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject, Subscription, zip, map } from 'rxjs';

import { ICategory as CategoryDB } from '@core/models/Category';
import { ICategoryFull as Category } from '../models/icategory-full';

import { CategoryFirebaseService } from '@core/services/firebase/firebase-entities/categoryFirebase.service';
import { RoleFirebaseService } from '@core/services/firebase/firebase-entities/roleFirebase.service';
import { IRole as RoleDB } from '@core/models/Role';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	categories: Category[];
	singleCategory: Category;

	singleCategory$ = new Subject<Category>();
	categories$ = new Subject<Category[]>();

	constructor(
		private categoriesFbSevice: CategoryFirebaseService,
		private rolesFbService: RoleFirebaseService
	) {}

	getCategoryAll(): Observable<Category[]> {
		this.categoriesFbSevice
			.getStreamCategories()
			// .pipe(
			// 	map(categories => {
			// 		let categoriesFull: Category[] = categories;
			// 		categoriesFull.forEach(cat => {
			// 			const subCategories$ = this.categoriesFbSevice.getSubCategories(
			// 				cat.id
			// 			);
			// 			cat = { ...cat, subCategoriesFull: [] };

			// 			subCategories$.subscribe(subCategories => {
			// 				cat.subCategoriesFull = subCategories;
			// 			});
			// 		});
			// 		return categoriesFull;
			// 	})
			// )
			// .subscribe(cats => {
			// 	this.categories = cats;
			// 	this.categories$.next(this.categories);
			// 	console.log(this.categories);
			// });

			.subscribe(categoriesFromDB => {
				this.categories = categoriesFromDB;
				this._attachDataToCategories();
				this.categories$.next(this.categories);
			});
		return this.categories$.asObservable();
	}

	_attachDataToCategories() {
		this.categories.forEach(category => {
			// --- SUBCAT
			this.categoriesFbSevice
				.getSubCategories(category.id)
				.subscribe(subCategories => {
					category.subCategoriesFull = subCategories;
					this.categories$.next(this.categories);
				});

			this.rolesFbService.getRoles().subscribe(roleDB => {
				category.rolesFull = [];
				category.availableRolesToView.forEach(roleId => {
					let currentRole = roleDB.filter(role => role.id == roleId)[0];
					if (currentRole) category.rolesFull.push(currentRole);
				});
			});

			/*
			 ----------
			*/

			// const roles$ = this.rolesFbService.getRoles();
			// const subCat$ = this.categoriesFbSevice.getSubCategories(category.id);

			// const subCatRolesSubsrc = zip(roles$, subCat$).subscribe(response => {
			// 	const [roles, subCat] = response;
			// 	category = { ...category, rolesFull: [], subCategoriesFull: [] };

			// 	category.subCategoriesFull = subCat;

			// 	category.availableRolesToView.forEach(roleId => {
			// 		const currentRole = roles.filter(role => role.id == roleId)[0];
			// 		if (currentRole) category.rolesFull.push(currentRole);
			// 	});

			// 	this.categories$.next(this.categories);
			// 	console.log(category);
			// });
		});
	}

	getCategoryById(id: string): Observable<Category> {
		this.categoriesFbSevice.getCategory(id).subscribe(categoryDB => {
			this.singleCategory = categoryDB;
			this.categoriesFbSevice
				.getSubCategories(id)
				.subscribe(subCategoriesDB => {
					this.singleCategory.subCategoriesFull = subCategoriesDB;
					this.singleCategory$.next(this.singleCategory);
				});
		});
		return this.singleCategory$.asObservable();
	}

	// attachRoleToCategory(category: Category): Category {
	// 	let result = { ...category, rolesFull: [] };
	// 	result.availableRolesToView.forEach(roleId =>nameategory} by id ${roleId}`);
	// 		console.log(result);
	// 	});
	// 	return result;
	// }

	// getCategoryById(id: any): Observable<Category> {
	// getCategoryById(id: any) {
	// this.categoriesFbSevice.
	// }

	//

	//

	//

	//

	addCategory(category: Category): void {
		console.table({
			// id: 'Will be set in future',
			// name: category. || '-',
			'Created by': 'Will be set in future'
			// Subcategories: category.subCategoriesFull.join(', ') || '-',
			// Roles: category.availableRolesToView.join(', ') || '-'
		});
	}

	editCategory(category: Category): void {
		console.table({
			id: category.id,
			name: category.name || '-',
			createdBy: category.createdBy,
			Subcategories: category.subCategories.join(', ') || '-',
			Roles: category.availableRolesToView.join(', ') || '-'
		});
	}

	// getSubcategoriesByCategoryId(id: string) {
	// 	this.categoriesFbSevice.getSubCategories(id)
	// }
}
