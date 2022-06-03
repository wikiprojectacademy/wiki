import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, take } from 'rxjs';
import { CategoryService } from '../../services/categories.service';

import { ICategoryFull as Category } from '../../models/icategory-full';
import { PostFirebaseService } from '@core/services/firebase/firebase-entities/postFirebase.service';
import { CurrentUserService } from '@core/services/user/current-user.service';

@Component({
	selector: 'app-categories-list',
	templateUrl: './categories-list.component.html',
	styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent {
	categories: Category[];
	categories$ = new Observable<Category[]>();
	isLoading = true;

	constructor(
		private categoryService: CategoryService,
		private postFbService: PostFirebaseService,
		private currentUserService: CurrentUserService
	) {
		this.getCategories();
	}

	getCategories(): void {
		const categories$ = this.categoryService.getCategoryAll().pipe(take(1));
		const posts$ = this.postFbService.getCollection().pipe(take(1));
		const currentUser$ = this.currentUserService.currentUser$;

		combineLatest([categories$, posts$, currentUser$]).subscribe(
			([categoriesFromDB, postsFromDB, currentUser]) => {
				const roleID = currentUser.roleId;

				this.categories = this.filterCategoriesByRoleID(
					categoriesFromDB,
					roleID
				);

				this.categories.forEach(cat => {
					cat.postAmout = 0;
					postsFromDB.forEach(post => {
						if (post.categoryId == cat.id) cat.postAmout++;
					});
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

		const categoriesAviableByRole: Category[] = categories.filter(cat => {
			for (let role of cat.rolesFull) {
				if (role.id == roleID) return true;
			}
			return false;
		});
		return [...categoriesAviableByRole, ...categoriesAviableForAll];
	}
}
