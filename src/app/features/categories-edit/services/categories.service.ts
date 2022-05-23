import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject, tap, take } from 'rxjs';

import { ICategory as CategoryDB } from '@core/models/Category';
import { ISubCategory as SubCategoryDB } from '@core/models/SubCategory';
import { ICategoryFull as Category } from '../models/icategory-full';
import { IUser as UserDB } from '@core/models/User';
import { IUserInCategory as User } from '../models/userInCategory.interface';
import { IRole as RoleDB } from '@core/models/Role';

import { UserFirebaseService } from '@core/services/firebase/firebase-entities/userFirebase.service';
import { CategoryFirebaseService } from '@core/services/firebase/firebase-entities/categoryFirebase.service';
import { RoleFirebaseService } from '@core/services/firebase/firebase-entities/roleFirebase.service';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	private categories: Category[];
	private singleCategory: Category;

	private singleCategory$ = new Subject<Category>();
	private categories$ = new Subject<Category[]>();

	constructor(
		private categoriesFbSevice: CategoryFirebaseService,
		private rolesFbService: RoleFirebaseService,
		private userFbService: UserFirebaseService
	) {}

	getCategoryAll(): Observable<Category[]> {
		this.categoriesFbSevice
			.getStreamCategories()
			.subscribe(categoriesFromDB => {
				this.categories = categoriesFromDB;
				this.attachDataToCategories();
			});
		return this.categories$.asObservable();
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

	/**
	 * Collect all observables and handle all of them in the end
	 */
	private attachDataToCategories(): void {
		let subCategoriesArray$: Observable<SubCategoryDB[]>[] = [];
		let rolesArray$: Observable<RoleDB>[] = [];
		let usersArray$: Observable<UserDB>[] = [];

		this.categories.forEach(category => {
			// --- Created By ---
			const user$ = this.userFbService.getUserData(category.createdBy);
			usersArray$.push(this.processUser$(user$, category));

			// --- Subcategories ---
			const subCategory$ = this.categoriesFbSevice.getSubCategories(
				category.id
			);
			subCategoriesArray$.push(
				this.processSubCategories$(subCategory$, category)
			);

			// --- Avaible roles to view ---
			category.rolesFull = []; // need to be array, not undefined
			category.availableRolesToView.forEach(roleId => {
				const role$ = this.rolesFbService.getRole(roleId);
				rolesArray$.push(this.processRole$(role$, category));
			});
		});

		// After done all of observable finally pass modified this.category to component
		forkJoin([
			...subCategoriesArray$,
			...rolesArray$,
			...usersArray$
		]).subscribe(() => {
			this.processDataToComponent();
		});
	}

	private processDataToComponent(): void {
		this.categories$.next(this.categories);
	}

	private processUser$(
		user$: Observable<User>,
		category: Category
	): Observable<User> {
		return user$.pipe(
			tap(user => {
				if (user) {
					const fullName: User = {
						// Look in IUserInCategory interface for adding new fields
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName
					};
					category.createdByFull = fullName;
				}
			}),
			take(1)
		);
	}

	private processSubCategories$(
		subCategories$: Observable<SubCategoryDB[]>,
		category: Category
	) {
		return subCategories$.pipe(
			tap(subCat => {
				category.subCategoriesFull = subCat;
			}),
			take(1)
		);
	}

	private processRole$(role$: Observable<RoleDB>, category: Category) {
		return role$.pipe(
			tap(role => {
				if (role) {
					category.rolesFull.push(role);
				}
			}),
			take(1)
		);
	}

	// getSubcategoriesByCategoryId(id: string) {
	// 	this.categoriesFbSevice.getSubCategories(id)
	// }
}
