import { Injectable } from '@angular/core';
import {
	forkJoin,
	Observable,
	Subject,
	tap,
	take,
	combineLatest,
	zip
} from 'rxjs';

import { ICategory as CategoryDB } from '@core/models/Category';
import { ISubCategory as SubCategoryDB } from '@core/models/SubCategory';
import { ICategoryFull as Category } from '../models/icategory-full';
import { IUser as UserDB } from '@core/models/User';
import { IUserInCategory as User } from '../models/userInCategory.interface';
import { IRole as RoleDB } from '@core/models/Role';
import { IRoleCategoryPair as RoleCategoryDB } from '@core/models/RoleCategoryPair';

import { UserFirebaseService } from '@core/services/firebase/firebase-entities/userFirebase.service';
import { CategoryFirebaseService } from '@core/services/firebase/firebase-entities/categoryFirebase.service';
import { RoleFirebaseService } from '@core/services/firebase/firebase-entities/roleFirebase.service';
import { RoleCategoryFirebaseService } from '@core/services/firebase/firebase-entities/roleCategoryFirebase.service';

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
		private rolesFbService: RoleFirebaseService,
		private roleCatServ: RoleCategoryFirebaseService,
		private userFbService: UserFirebaseService
	) {}

	getCategoryAll(): Observable<Category[]> {
		const categoriesDB$ = this.categoriesFbSevice
			.getStreamCategories()
			.pipe(tap(cats => (this.categories = cats)));
		const catRolesDB$ = this.roleCatServ
			.getCollection()
			.pipe(tap(crPair => (this.roleCategoryPairs = crPair)));

		combineLatest([categoriesDB$, catRolesDB$]).subscribe(() => {
			console.log('in combine latest');
			this.attachDataToCategories();
		});
		return this.categories$.asObservable();
	}

	getCategoryById(id: string): Observable<Category> {
		this.categoriesFbSevice.getDoc(id).subscribe(categoryFromDB => {
			// this.categoriesFbSevice.getCategory(id).subscribe(categoryFromDB => {
			this.singleCategory = categoryFromDB;
			// console.log('getcategorybyid');
			// console.log(categoryFromDB);
			this.attachDataToSingleCategory();
		});
		return this.singleCategory$.asObservable();
	}

	addCategory(category: Category): Promise<string> {
		console.log('input categoryfull:');
		console.log(category);

		// addCategory(): Promise<string> {
		const categoryToDB: CategoryDB = {
			name: category.name,
			createdBy: category.createdBy,
			availableRolesToView: category.availableRolesToView
		};

		///
		console.log('category to DB: ');
		console.log(categoryToDB);
		///

		const subCategoriesDB: SubCategoryDB[] = category.subCategoriesFull;

		///
		console.log('subactegories to DB: ');
		console.log(subCategoriesDB);

		console.log('cat.subcats: ');
		console.log(category.subCategoriesFull);
		///

		console.log('try to write');
		return this.categoriesFbSevice
			.addDocWithAutoId(categoryToDB)
			.then(newCategoryId => {
				this.categoriesFbSevice.addDocToSubCollection(
					newCategoryId,
					subCategoriesDB
				);
			})
			.then(() => Promise.resolve('done'));
	}

	testAdd(): Promise<string> {
		const testCategory: CategoryDB = {
			name: 'lalalal',
			createdBy: '2'
		};

		console.log('try to write');
		return this.categoriesFbSevice.addDocWithAutoId(testCategory);
	}

	testSubAdd(categoryId: string): Promise<void> {
		const testSubcategory: SubCategoryDB = {
			name: 'esfesfesfesfe'
		};

		console.log('trying to add subcategories');
		return this.categoriesFbSevice.addDocToSubCollection(
			categoryId,
			testSubcategory
		);
		// return this.categoriesFbSevice.addSubCategory(categoryId, testSubcategory);
	}

	editCategory(category: Category): void {
		console.log('got in service');
	}

	/**
	 * Collect all observables and handle all of them in the end
	 */
	private attachDataToCategories(): void {
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
					console.log(pair);
					availableRolesToView.push(pair.roleId);
				}
			});
			console.log(
				`Roles for Category ${category.name}: ${availableRolesToView.length}`
			);
			if (availableRolesToView) {
				availableRolesToView.forEach(roleId => {
					if (roleId) {
						const role$ = this.rolesFbService.getRole(roleId);
						rolesArray$.push(this.processRole$(role$, category));
					}
				});
			}

			// --- --- --- --- --- --- --- ---
			// category.rolesFull = []; // need to be array, not undefined
			// if (category.availableRolesToView) {
			// 	category.availableRolesToView.forEach(roleId => {
			// 		if (roleId) {
			// 			const role$ = this.rolesFbService.getRole(roleId);
			// 			rolesArray$.push(this.processRole$(role$, category));
			// 		}
			// 	});
			// }

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
		if (this.singleCategory.availableRolesToView) {
			this.singleCategory.availableRolesToView.forEach(roleId => {
				const role$ = this.rolesFbService.getRole(roleId);
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
