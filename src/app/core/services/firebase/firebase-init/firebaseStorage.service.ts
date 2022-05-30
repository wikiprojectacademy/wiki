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
import {
	IFullCategory,
	TestMock
} from '@core/services/firebase/firebase-init/test-mock.model';
import { HttpClient } from '@angular/common/http';
import { IPost } from '@core/models/Post';

const PATH_TO_DEFAULT_DATA = './assets/static/';
const FILE_NAME = 'test-data.json';

@Injectable({
	providedIn: 'root'
})
export class FirebaseStorageService {
	pathToDefaultData = '';
	private usersCollection: AngularFirestoreCollection<IUser>;
	users: Observable<IUser[]>;
	isDatabaseInitialized: boolean;

	constructor(
		private firestore: AngularFirestore,
		private categoryService: CategoryFirebaseService,
		private postService: PostFirebaseService,
		private roleFirebase: RoleFirebaseService,
		private roleCategoryFirebase: RoleCategoryFirebaseService,
		private userFirebase: UserFirebaseService,
		private httpClient: HttpClient
	) {
		this.usersCollection = this.firestore.collection<IUser>('users');
		this.users = this.usersCollection.valueChanges();
	}

	isDBInitialized(): Observable<IUser[]> {
		return this.userFirebase.getCollectionSnapshot();
	}

	/**
	 * Database initialization method. Available only for super admin.
	 * Can be useful for testing, when you connect application to empty
	 * Firestore database.
	 */
	async initDB(): Promise<void> {
		const mockData: TestMock = await this.loadMockDataFromAssets();
		const loadingData = await Promise.all([
			this.initRoles(mockData.roles),
			this.initUsers(mockData.users),
			this.initCategories(mockData.categories),
			this.initRoleCategoryRelations(mockData.roleCategories),
			this.initPosts(mockData.posts)
		])
			.then(() => {
				console.log('DB initialized');
				return Promise.resolve();
			})
			.catch(error => console.error(error));
		return loadingData;
	}

	loadMockDataFromAssets(): Promise<TestMock> {
		return this.httpClient
			.get<TestMock>(PATH_TO_DEFAULT_DATA + FILE_NAME)
			.toPromise();
	}

	initTest(): Promise<void> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				return resolve();
			}, 2000);
		});
	}

	initCategories(categories: IFullCategory[]): Promise<void[]>[] {
		return categories.map((category: IFullCategory) => {
			return this.categoryService
				.addCategoryWithId(category.id, {
					name: category.name,
					createdBy: category.createdBy
				})
				.then(() => {
					if (categories.length) {
						return category.subCategories.map((subCategory: ISubCategory) => {
							this.categoryService.addInSubCategoryWithCustomId(
								category.id as string,
								subCategory.id,
								{
									name: subCategory.name
								}
							);
						});
					}
				});
		});
	}

	initRoleCategoryRelations(
		roleCategoryPairs: IRoleCategoryPair[]
	): Promise<string>[] {
		return roleCategoryPairs.map(relation =>
			this.roleCategoryFirebase.addRoleCategoryEntry(relation)
		);
	}

	initRoles(roles: IRole[]) {
		return roles.map(role => {
			return this.roleFirebase.addRoleWithCustomId(role.id, {
				name: role.name,
				hasUsers: role.hasUsers,
				canModifyPost: role.canModifyPost,
				canModifyCategory: role.canModifyCategory
			});
		});
	}

	initUsers(users: IUser[]) {
		users.map(user => {
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

	initPosts(posts: IPost[]): Promise<void>[] {
		return posts.map(post =>
			this.postService.addPostWithCustomId(post.id, {
				title: post.title,
				contentHTML: post.contentHTML,
				categoryId: post.categoryId,
				subCategory: post?.subCategory ? post.subCategory : ''
			})
		);
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
