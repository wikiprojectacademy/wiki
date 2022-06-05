import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategoryFull as Category } from 'src/app/features/categories-edit/models/icategory-full';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	@Input() isOpened: boolean = false;
	@Input() isUserCanModCat: boolean = false;
	@Input() searchParams = {
		categoryId: 'all',
		subCategoryId: null,
		phrase: ''
	};
	@Input() categories: Category[];

	@Output() currentCategory = new EventEmitter<string>();
	@Output() currentSubCategory = new EventEmitter<string>();
	@Output() closeSidebar = new EventEmitter<boolean>();

	constructor() {}

	setSelectedCategory(categoryID: string, subCategoryID: string) {
		this.currentCategory.emit(categoryID);
		this.currentSubCategory.emit(subCategoryID);
		this.searchParams.categoryId = categoryID;
		this.searchParams.subCategoryId = subCategoryID;
		this.close();
	}

	close() {
		this.closeSidebar.emit(false);
	}

	ngOnInit(): void {}
}
