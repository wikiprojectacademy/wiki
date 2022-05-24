import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../services/categories.service';

import { ICategoryFull as Category } from '../../models/icategory-full';

@Component({
	selector: 'app-categories-list',
	templateUrl: './categories-list.component.html',
	styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
	categories: Category[];
	categories$ = new Observable<Category[]>();
	// catSub = new Subscription();
	isLoading = true;

	constructor(private categoryService: CategoryService) {
		this.categories$ = this.categoryService.getCategoryAll();
		const catSub = this.categories$.subscribe(cat => {
			this.isLoading = true;
			this.categories = cat;
			this.isLoading = false;
		});
	}

	ngOnInit(): void {}
}
