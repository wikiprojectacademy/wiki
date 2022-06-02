import { Component, OnInit } from '@angular/core';
import { IPost as Post } from '@core/models/Post';
import { PostFirebaseService } from '@core/services/firebase/firebase-entities/postFirebase.service';
import { FirebaseStorageService } from '@core/services/firebase/firebase-init/firebaseStorage.service';
import { ICategoryFull as Category } from '../categories-edit/models/icategory-full';
import { CategoryService } from '../categories-edit/services/categories.service';

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
	isPostLoaded: boolean = false;
	isCategoriesLoaded: boolean = false;

	categories: Category[];
	posts: Post[];

	constructor(
		private categoryService: CategoryService,
		private postFbService: PostFirebaseService
	) {}

	ngOnInit(): void {
		this.categoryService.getCategoryAll().subscribe(response => {
			this.categories = response;
			this.isCategoriesLoaded = true;
		});

		this.postFbService.getCollection().subscribe(postsFromDB => {
			this.posts = postsFromDB;
			this.isPostLoaded = true;
		});
	}

	changeSearchParams(categoryID: string, subCategoryID: string): void {
		this.isOpened = false;
		this.searchParams = {
			...this.searchParams,
			categoryId: categoryID,
			subCategoryId: subCategoryID
		};
	}

	changeSearchPhrase(text: any) {
		this.searchParams.phrase = text.value;
	}
}
