import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/categories.service';

import { ICategoryFull as Category } from '../../models/icategory-full';

@Component({
	selector: 'app-categories-list',
	templateUrl: './categories-list.component.html',
	styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent {
	categories: Category[];
	categories$ = new Observable<Category[]>();
	isLoading = true;

	constructor(private categoryService: CategoryService) {
		this.getCategories();
	}

	getCategories(): void {
		this.categories$ = this.categoryService.getCategoryAll();
		// this.timer = setInterval(() => console.log(this.categories.length), 1000);
		const catSub = this.categories$.subscribe(cat => {
			this.isLoading = true;
			this.categories = cat;
			this.isLoading = false;
			// catSub.unsubscribe();
		});
	}
}
