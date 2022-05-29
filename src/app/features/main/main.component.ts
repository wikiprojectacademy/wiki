import { Component, OnInit } from '@angular/core';
import { IPost } from '@core/models/Post';
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
		categoryId: '8',
		subCategoryId: null,
		phrase: ''
	};
	mockedPosts: IPost[] = [
		{ categoryId: '6', contentHTML: '-', title: 'C++' },
		{ categoryId: '6', contentHTML: '-', title: 'HTML' },
		{ categoryId: '6', contentHTML: '-', title: 'JavaScript' },
		{ categoryId: '7', contentHTML: '-', title: 'Audi' },
		{ categoryId: '7', contentHTML: '-', title: 'BMW' },
		{ categoryId: '7', contentHTML: '-', title: 'Mercedes' },
		{ categoryId: '8', contentHTML: '-', title: 'How to repair notebook' },
		{
			categoryId: '8',
			subCategory: 'CqJam3A7XkHnzQLzhjf0',
			contentHTML: '-',
			title: 'NT-5325'
		},
		{
			categoryId: '8',
			subCategory: 't8JPrF390yaEwtwGHiXM',
			contentHTML: '-',
			title: 'Mac Book'
		}
	];

	isOpened: boolean = false;

	mockedCateg = [
		{
			name: 'Test Name',
			subCategories: [{ id: '1-2', name: 'Test nested' }]
		},
		{
			name: 'Program',
			subCategories: [
				{ id: '1-2', name: 'Front' },
				{ id: '1-2', name: 'Back' }
			]
		},
		{
			name: 'Empty category',
			subCategories: []
		},
		{
			name: 'Food',
			subCategories: [
				{ id: '1-2', name: 'Fruit' },
				{ id: '1-2', name: 'Vegetables' },
				{ id: '1-2', name: 'Bread' },
				{ id: '1-2', name: 'Meat' },
				{ id: '1-2', name: 'Something else' }
			]
		}
	];

	categories: Category[];

	isDatabaseInitialized: boolean;

	constructor(
		private firebaseStorage: FirebaseStorageService,
		private categoryService: CategoryService
	) {}

	ngOnInit(): void {
		this.firebaseStorage.isDBInitialized().subscribe(users => {
			this.isDatabaseInitialized = users.length > 2;
		});
		this.categoryService.getCategoryAll().subscribe(response => {
			this.categories = response;
		});
	}

	changeSearchParams(categoryID: string, subCategoryID: string): void {
		this.searchParams = {
			...this.searchParams,
			categoryId: categoryID,
			subCategoryId: subCategoryID
		};
	}

	initDB() {
		this.firebaseStorage.initDB();
	}
}
