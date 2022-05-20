import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/categories.service';

@Component({
	selector: 'app-categories-list',
	templateUrl: './categories-list.component.html',
	styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
	categories;
	constructor(private categoryService: CategoryService) {
		this.categories = this.categoryService.getCategoryAll();
	}

	ngOnInit(): void {}
}
