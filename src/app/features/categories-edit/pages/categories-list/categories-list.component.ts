import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../services/categories.service';

import { ICategoryFull as Category } from '../../models/icategory-full';

@Component({
	selector: 'app-categories-list',
	templateUrl: './categories-list.component.html',
	styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
	categories: Category[];
	categories$ = new Observable<Category[]>();
	// catSub = new Subscription();
	isLoading = true;

	timer;

	constructor(private categoryService: CategoryService) {}

	ngOnInit(): void {
		this.getCategories();
	}

	ngOnDestroy(): void {
		clearInterval(this.timer);
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
