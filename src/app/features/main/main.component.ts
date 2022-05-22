import { Component, OnInit } from '@angular/core';
import { FirebaseStorageService } from '@core/services/firebase/firebase-init/firebaseStorage.service';
import { ICategoryFull as Category } from '../categories-edit/models/icategory-full';
import { CategoryService } from '../categories-edit/services/categories.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	mockedPosts = [
		{ title: 'title number one', content: 'test content' },
		{ title: 'SUPER TITLE', content: 'test content medium medium test test' },
		{
			title: 'Test test test',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet metus mollis, faucibus purus sit amet, blandit massa. Nunc luctus tra tra fsdgesgse fesgfgesgfesg e vgsrgrd'
		},
		{
			title: 'Test test test',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet metus mollis, faucibus purus sit amet, blandit massa. Nunc luctus tra tra fsdgesgse fesgfgesgfesg e vgsrgrd'
		},
		{
			title: 'Test test test',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet metus mollis, faucibus purus sit amet, blandit massa. Nunc luctus tra tra fsdgesgse fesgfgesgfesg e vgsrgrd'
		},
		{
			title: 'Test test test',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet metus mollis, faucibus purus sit amet, blandit massa. Nunc luctus tra tra fsdgesgse fesgfgesgfesg e vgsrgrd'
		},
		{
			title: 'Test test test',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet metus mollis, faucibus purus sit amet, blandit massa. Nunc luctus tra tra fsdgesgse fesgfgesgfesg e vgsrgrd'
		},
		{
			title: 'Test test test',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet metus mollis, faucibus purus sit amet, blandit massa. Nunc luctus tra tra fsdgesgse fesgfgesgfesg e vgsrgrd'
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

	initDB() {
		this.firebaseStorage.initDB();
	}
}
