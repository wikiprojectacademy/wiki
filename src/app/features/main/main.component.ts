import { Component, OnInit } from '@angular/core';
import { IPost as PostDB } from '@core/models/Post';
import { IUser as UserDB } from '@core/models/User';
import { PostFirebaseService } from '@core/services/firebase/firebase-entities/postFirebase.service';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { combineLatest, Observable, take } from 'rxjs';
import { ICategoryFull as Category } from '../categories-edit/models/icategory-full';
import { CategoryService } from '../categories-edit/services/categories.service';
import { RolesService } from '../categories-edit/services/roles.service';
import { PostFull as Post } from './models/PostFull.interface';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	searchParams = {
		categoryId: 'all',
		subCategoryId: null,
		phrase: ''
	};

	isOpened: boolean = false;
	isLoading: boolean = true;
	isUserCanModCat: boolean = false;
	isUserLoggedIn;
	isItEmpty: boolean = true;

	// currentUser$: Observable<UserDB>;
	categories: Category[];
	posts: Post[];

	// mock: Post[] = [
	// 	{ categoryId: '8', contentHTML: '', title: 'test' },
	// 	{ categoryId: '8', contentHTML: '', title: 'test' },
	// 	{ categoryId: '8', contentHTML: '', title: 'test' },
	// 	{ categoryId: '8', contentHTML: '', title: 'test' },
	// 	{ categoryId: '8', contentHTML: '', title: 'test' },
	// 	{ categoryId: '8', contentHTML: '', title: 'test' },
	// 	{ categoryId: '8', contentHTML: '', title: 'test' },
	// 	{ categoryId: '8', contentHTML: '', title: 'test' }
	// ];

	constructor(
		private categoryService: CategoryService,
		private postFbService: PostFirebaseService,
		private currentUserService: CurrentUserService,
		private rolesService: RolesService
	) {
		this.isUserLoggedIn = currentUserService.isUserLogin$;
		// this.currentUser$ = this.currentUserService.currentUser$;
	}

	ngOnInit(): void {
		const categories$ = this.categoryService.getCategoryAll().pipe(take(1));
		const posts$ = this.postFbService.getCollection().pipe(take(1));
		const currentUser$ = this.currentUserService.currentUser$;

		combineLatest([categories$, posts$, currentUser$]).subscribe(
			([categoriesFromDB, postsFromDB, currentUser]) => {
				const roleID = currentUser.roleId;
				this.updateUserPermisionCanEditCategory(roleID);

				this.categories = this.filterCategoriesByRoleID(
					categoriesFromDB,
					roleID
				);

				this.posts = postsFromDB.filter(post => {
					const id = post.categoryId;
					for (let cat of this.categories) {
						if (cat.id == id) return true;
					}
					return false;
				});

				this.isLoading = false;
			}
		);
	}

	filterCategoriesByRoleID(categories: Category[], roleID: string): Category[] {
		if (!categories) return [];
		if (roleID == '0') return categories;

		const categoriesAviableForAll: Category[] = [];

		categories.forEach(cat => {
			if (!cat.rolesFull || !cat.rolesFull.length) {
				categoriesAviableForAll.push(cat);
			}
		});

		if (!roleID) return categoriesAviableForAll;
		// --- --- --- --- --- --- --- --- --- --- --- ---
		const categoriesAviableByRole: Category[] = categories.filter(cat => {
			for (let role of cat.rolesFull) {
				if (role.id == roleID) return true;
			}
			return false;
		});
		return [...categoriesAviableByRole, ...categoriesAviableForAll];
	}

	updateUserPermisionCanEditCategory(roleID: string) {
		if (!roleID) {
			this.isUserCanModCat = false;
			return;
		}
		this.rolesService
			.getRoleById(roleID)
			.pipe(take(1))
			.subscribe(role => {
				const canModCategories = role.canModifyCategory;
				if (canModCategories) {
					this.isUserCanModCat = true;
				}
			});
	}

	changeSearchPhrase(text: any) {
		this.searchParams.phrase = text.value;
	}
}
