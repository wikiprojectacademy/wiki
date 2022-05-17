import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import { IUser } from '@core/models/User';
import { combineLatest, map, Observable, take } from 'rxjs';
import { ICategory } from '@core/models/Category';
import { CategoryFirebaseService } from '@core/services/firebase/firebase-entities/categoryFirebase.service';
import { ISubCategory } from '@core/models/SubCategory';
import { PostFirebaseService } from '@core/services/firebase/firebase-entities/postFirebase.service';
import { RoleFirebaseService } from '@core/services/firebase/firebase-entities/roleFirebase.service';
import { UserFirebaseService } from '@core/services/firebase/firebase-entities/userFirebase.service';
import { RoleCategoryFirebaseService } from '@core/services/firebase/firebase-entities/roleCategoryFirebase.service';
import {
	categoriesMock,
	postsMock,
	roleCategoryMocks,
	rolesMock,
	subCategoriesMock,
	usersMock
} from '@core/models/test-data';
import { IRole } from '@core/models/Role';
import { IRoleCategoryPair } from '@core/models/RoleCategoryPair';

@Injectable({
	providedIn: 'root'
})
export class FirebaseStorageService {
	private usersCollection: AngularFirestoreCollection<IUser>;
	users: Observable<IUser[]>;
	isLoading: boolean;
	isDatabaseInitialized: boolean;

	constructor(
		private firestore: AngularFirestore,
		private categoryService: CategoryFirebaseService,
		private postService: PostFirebaseService,
		private roleFirebase: RoleFirebaseService,
		private roleCategoryFirebase: RoleCategoryFirebaseService,
		private userFirebase: UserFirebaseService
	) {
		this.usersCollection = this.firestore.collection<IUser>('users');
		this.users = this.usersCollection.valueChanges();
	}

	isDBInitialized(): Observable<IUser[]> {
		return this.userFirebase.getCollectionSnapshot();
	}

	initDB(): void {
		this.isLoading = true;
		Promise.all([
			this.initRoles(),
			this.initUsers(),
			this.initCategories(),
			this.initPosts(),
			this.initRoleCategoryRelations()
		]).then(() => {
			this.isLoading = false;
			console.log('DB initialized');
		});
	}

	initCategories(): Promise<void[]>[] {
		const categories = categoriesMock.map((category: ICategory) => {
			return this.categoryService
				.addCategoryWithId(category.id, {
					name: category.name,
					createdBy: category.createdBy,
					availableRolesToView: category.availableRolesToView
				})
				.then(() => {
					return category.subCategories.map((subCategoryId: string) => {
						const subCategory: ISubCategory = subCategoriesMock.find(
							subcategory => subcategory.id === subCategoryId
						);
						if (subCategory) {
							this.categoryService.addSubCategory(category.id as string, {
								name: subCategory.name
							});
						}
					});
				});
		});
		return categories;
	}

	initRoleCategoryRelations(): Promise<string>[] {
		return roleCategoryMocks.map(relation =>
			this.roleCategoryFirebase.addRoleCategoryEntry(relation)
		);
	}

	initRoles() {
		const role = rolesMock.map(role => {
			return this.roleFirebase.addRoleWithCustomId(role.id, {
				name: role.name,
				hasUsers: role.hasUsers,
				canModifyPost: role.canModifyPost,
				canModifyCategory: role.canModifyCategory
			});
		});
		return role;
	}

	initUsers() {
		const users = usersMock.map(user => {
			return this.userFirebase.addUserWithCustomId(user.id, {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				password: user.password,
				roleId: user.roleId
			});
		});
		return users;
	}

	initPosts(): Promise<void>[] {
		const posts = postsMock.map(post =>
			this.postService.addPostWithCustomId(post.id, {
				title: post.title,
				contentHTML: post.contentHTML,
				categoryId: post.categoryId,
				subCategory: post.subCategory
			})
		);
		return posts;
	}

	getLiveCategories() {
		return this.categoryService.getStreamCategories();
	}

	getSubCategories(parentId: string, subCollectionId: string) {
		return this.categoryService.getStreamSubCategories(
			parentId,
			subCollectionId
		);
	}

	getSubCollection(id: string) {
		return this.categoryService.getSubCategories(id);
	}

	getUsers() {
		return this.users;
	}

	addUser(user: IUser) {
		this.usersCollection.add(user).then(response => {
			console.log(response);
		});
	}

	/**
	 * Method listed below, left as example to work with native Firestore API
	 * @param roleType
	 */
	getRoleByType(roleType: string) {
		const roles: AngularFirestoreCollection<IRole> =
			this.firestore.collection<IRole>('roles', ref =>
				ref.where('type', '==', roleType)
			);
		return roles.get();
	}

	/**
	 * Return list of categories available for view by Role
	 * @param roleId
	 */
	async getCategoriesForRole(roleId: string) {
		const junctionsWithCertainRole = await this.firestore
			.collection<IRoleCategoryPair>('junction_role_category', ref =>
				ref.where('roleId', '==', roleId)
			)
			.ref.get();

		const categories$: Observable<ICategory | undefined>[] =
			junctionsWithCertainRole.docs
				.filter(doc => doc.exists)
				.map(doc =>
					this.firestore
						.doc<ICategory>(`categories/${doc.data().categoryId}`)
						.get()
						.pipe(map(snapshot => snapshot.data()))
				);

		const realCategories = this.getAllCategories(categories$).pipe(take(1));
		let categories: (ICategory | undefined)[] = [];
		realCategories.subscribe(
			categoriesResponse => (categories = categoriesResponse)
		);
		return realCategories;
	}

	async getNonRelatedCategories() {
		const collection: AngularFirestoreCollection<IRoleCategoryPair> =
			this.firestore.collection<IRoleCategoryPair>('junction_role_category');
		const categories = await collection.ref.get();
		const allCategoriesData = categories.docs.map(doc => doc.data());
	}

	getAllCategories(categories: Observable<ICategory | undefined>[]) {
		return combineLatest(categories);
	}
}
