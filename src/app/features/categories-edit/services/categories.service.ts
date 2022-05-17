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
			subCategories: [
				{ name: 'Banana' },
				{ name: 'Cherry' },
				{ name: 'Avocado' }
			],
			availableRolesToView: []
		},
		{
			id: '12',
			name: 'test name 2',
			createdBy: 'hz',
			subCategories: [{ name: 'test name sub2' }, { name: 'test name sub3' }],
			availableRolesToView: [
				{
					id: 'role1',
					type: 'admin',
					permissions: null,
					availableCategoriesToView: null
				},
				{
					id: 'role2',
					type: 'user',
					permissions: null,
					availableCategoriesToView: null
				}
			]
		},
		{
			id: 'agsgseg',
			name: 'Programing',
			createdBy: 'hz',
			subCategories: [{ name: 'JavaScript' }, { name: 'C++' }, { name: 'SQL' }],
			availableRolesToView: []
		},
		{
			id: 'testo',
			name: 'test name 4',
			createdBy: 'hz',
			subCategories: [{ name: 'test name sub 0' }],
			availableRolesToView: [
				{
					id: 'role1',
					type: 'user',
					permissions: null,
					availableCategoriesToView: null
				},
				{
					id: 'role2',
					type: 'guest',
					permissions: null,
					availableCategoriesToView: null
				}
			]
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
