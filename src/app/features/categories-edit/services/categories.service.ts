import { Injectable } from '@angular/core';
import { ICategory as Category } from '@core/models/Category';
import { IRole } from '@core/models/Role';
// import { ISubCategory } from '@core/models/SubCategory';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	mockedCat: Category[] = [
		{
			id: 'test',
			name: 'Fruits',
			createdBy: 'hz',
			subCategories: ['id1', 'id2'],
			availableRolesToView: []
		},
		{
			id: '12',
			name: 'test name 2',
			createdBy: 'hz',
			subCategories: [],
			availableRolesToView: ['id1']
		},
		{
			id: 'agsgseg',
			name: 'Programing',
			createdBy: 'hz',
			subCategories: [],
			availableRolesToView: []
		},
		{
			id: 'testo',
			name: 'test name 4',
			createdBy: 'hz',
			subCategories: [],
			availableRolesToView: []
		}
	];

	constructor() {}

	getCategoryAll(): Category[] {
		return this.mockedCat;
	}

	getCategoryById(id: any): Category {
		return this.mockedCat.filter(cat => cat.id == id)[0];
	}

	addCategory(category: Category): void {
		console.table({
			id: 'Will be set in future',
			name: category.name || '-',
			'Created by': 'Will be set in future',
			Subcategories: category.subCategories.join(', ') || '-',
			Roles: category.availableRolesToView.join(', ') || '-'
		});
	}

	editCategory(category: Category): void {
		console.table({
			id: category.id,
			name: category.name || '-',
			createdBy: category.createdBy,
			Subcategories: category.subCategories.join(', ') || '-',
			Roles: category.availableRolesToView.join(', ') || '-'
		});
	}
}
