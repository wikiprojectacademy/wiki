import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject, tap, take, combineLatest } from 'rxjs';

import { ICategory as CategoryDB } from '@core/models/Category';
import { ISubCategory as SubCategoryDB } from '@core/models/SubCategory';
import { ICategoryFull as Category } from '../models/icategory-full';
import { IUser as UserDB } from '@core/models/User';
import { IUserInCategory as User } from '../models/userInCategory.interface';
import { IRole as RoleDB } from '@core/models/Role';
import { IRoleCategoryPair as RoleCategoryDB } from '@core/models/RoleCategoryPair';

import { UserFirebaseService } from '@core/services/firebase/firebase-entities/userFirebase.service';
import { CategoryFirebaseService } from '@core/services/firebase/firebase-entities/categoryFirebase.service';
import { RolesService } from './roles.service';
import { CategoriesUpdateService } from './categories-update.service';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	private categories: Category[];
	private singleCategory: Category;
	private roleCategoryPairs: RoleCategoryDB[];

	private singleCategory$ = new Subject<Category>();
	private categories$ = new Subject<Category[]>();

	constructor(
		private categoriesFbSevice: CategoryFirebaseService,
		private rolesService: RolesService,
		private userFbService: UserFirebaseService,
		private categoriesUpdateService: CategoriesUpdateService
	) {}

	getCategoryAll(): Observable<Category[]> {
		const categoriesDB$ = this.categoriesFbSevice
			.getStreamCategories()
			.pipe(tap(categoriesFromDB => (this.categories = categoriesFromDB)));
		const catRolesDB$ = this.rolesService.getJunctionsAll().pipe(
			tap(crPair => (this.roleCategoryPairs = crPair)),
			take(1)
		);

		combineLatest([categoriesDB$, catRolesDB$]).subscribe(() => {
			this.attachDataToCategories();
		});
		return this.categories$.asObservable();
	}

	getCategoryById(id: string): Observable<Category> {
		const singleCategoryDB$ = this.categoriesFbSevice.getDoc(id).pipe(
			tap(categoryFromDB => (this.singleCategory = categoryFromDB)),
			take(1)
		);
		const catRolesDB$ = this.rolesService.getJunctionsAll().pipe(
			tap(catRolePairDB => (this.roleCategoryPairs = catRolePairDB)),
			take(1)
		);

		combineLatest([singleCategoryDB$, catRolesDB$]).subscribe(() => {
			this.attachDataToSingleCategory();
		});
		return this.singleCategory$.asObservable();
	}

	addCategory(category: Category): Promise<void> {
		const categoryToDB: CategoryDB = {
			name: category.name,
			createdBy: category.createdBy
		};
		const subCategoriesDB: SubCategoryDB[] = category.subCategoriesFull;

		return new Promise<void>((resolve, reject) => {
			this.categoriesFbSevice
				.addDocWithAutoId(categoryToDB)
				.then(newCategoryID => {
					const subCatAddingArray: Promise<void>[] = [];
					const addingJunctions: Promise<void> = this.rolesService.addJunctions(
						newCategoryID,
						category.availableRolesToView
					);

					subCategoriesDB.forEach(subCat => {
						subCatAddingArray.push(
							this.categoriesFbSevice.addDocToSubCollection(
								newCategoryID,
								subCat
							)
						);
					});

					Promise.all([...subCatAddingArray, addingJunctions])
						.then(() => {
							resolve();
						})
						.catch(reason => {
							reject(reason);
						});
				});
		});
	}

	editCategory(modCategory: Category, origCategory: Category): Promise<void> {
		return this.categoriesUpdateService.editCategory(modCategory, origCategory);
	}

	deleteCategory(category: Category): Promise<void> {
		const junctionsIdToDelete = [];
		const subCategoriesIdToDelete = [];

		this.roleCategoryPairs.forEach(pair => {
			if (pair.categoryId == category.id) {
				junctionsIdToDelete.push(pair.id);
			}
		});
		category.subCategoriesFull.forEach(subCat => {
			subCategoriesIdToDelete.push(subCat.id);
		});

		return new Promise<void>((resolve, reject) => {
			Promise.all([
				this.categoriesFbSevice.deleteDoc(category.id),
				this.rolesService.deleteJunctionByIds(junctionsIdToDelete),
				this.deleteSubCategories(category.id, subCategoriesIdToDelete)
			]).then(() => resolve());
			// resolve();
		});
	}

	private deleteSubCategories(
		categoryId: string,
		subCategoriesId: string[]
	): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			const deletingSubCat: Promise<void>[] = [];
			subCategoriesId.forEach(subCatID => {
				deletingSubCat.push(
					this.categoriesFbSevice.deleteDocFromSubCollection(
						categoryId,
						subCatID
					)
				);
			});

			Promise.all(deletingSubCat)
				.then(() => resolve())
				.catch(reason => {
					reject(reason);
				});
		});
	}

	/**
	 * Adds objects of ISubCategory, IRole to each category (this.categories)
	 *
	 */
	private attachDataToCategories(): void {
		if (!this.categories.length) this.processDataToComponent();
		let subCategoriesArray$: Observable<SubCategoryDB[]>[] = [];
		let rolesArray$: Observable<RoleDB>[] = [];
		let usersArray$: Observable<UserDB>[] = [];

		this.categories.forEach(category => {
			// --- Subcategories ---
			const subCategory$ = this.categoriesFbSevice.getSubCategories(
				category.id
			);
			subCategoriesArray$.push(
				this.processSubCategories$(subCategory$, category)
			);

			// --- Avaible roles to view ---
			category.rolesFull = []; // need to be array, not undefined
			const availableRolesToView: string[] = [];
			this.roleCategoryPairs.forEach(pair => {
				if (pair.categoryId == category.id) {
					// console.log(pair);
					availableRolesToView.push(pair.roleId);
				}
			});
			if (availableRolesToView) {
				availableRolesToView.forEach(roleId => {
					if (roleId) {
						const role$ = this.rolesService.getRoleById(roleId);
						rolesArray$.push(this.processRole$(role$, category));
					}
				});
			}

			// --- Created By ---
			const user$ = this.userFbService.getUserData(category.createdBy);
			usersArray$.push(this.processUser$(user$, category));
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

	/**
	 * Adds objects of ISubCategory, IRole to each category (this.singleCategory)
	 *
	 */
	private attachDataToSingleCategory(): void {
		let subCategories$: Observable<SubCategoryDB[]> =
			this.categoriesFbSevice.getSubCategories(this.singleCategory.id);
		// this.categoriesFbSevice.getSubCollection()
		let rolesArray$: Observable<RoleDB>[] = [];
		let user$: Observable<UserDB> = this.userFbService.getUserData(
			this.singleCategory.createdBy
		);

		subCategories$ = this.processSubCategories$(
			subCategories$,
			this.singleCategory
		);

		this.singleCategory.rolesFull = [];
		const availableRolesToView: string[] = [];
		this.roleCategoryPairs.forEach(pair => {
			if (pair.categoryId == this.singleCategory.id) {
				// console.log(pair);
				availableRolesToView.push(pair.roleId);
			}
		});
		if (availableRolesToView) {
			availableRolesToView.forEach(roleId => {
				const role$ = this.rolesService.getRoleById(roleId);
				rolesArray$.push(this.processRole$(role$, this.singleCategory));
			});
		}

		this.singleCategory.createdByFull = {};
		user$ = this.processUser$(user$, this.singleCategory);

		forkJoin([subCategories$, user$, ...rolesArray$])
			.pipe(take(1))
			.subscribe(() => {
				this.singleCategory$.next(this.singleCategory);
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
