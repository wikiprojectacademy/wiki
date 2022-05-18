import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

// todo this service is temporary it will delete after category module will be done
export class CategoryService {
	public categories: any[] = [
		{
			id: '10',
			name: 'angular'
		},
		{
			id: '1',
			name: 'react'
		},
		{
			id: '2',
			name: 'common'
		},
		{
			id: '3',
			name: 'git'
		},
		{
			id: '4',
			name: 'php'
		},
		{
			id: '5',
			name: 'java'
		},
		{
			id: '6',
			name: 'c++'
		},
		{
			id: '7',
			name: 'c#'
		},
		{
			id: '8',
			name: 'rxjs'
		},
		{
			id: '9',
			name: 'javascript'
		}
	];

	getCategories(): any[] {
		return this.categories;
	}

	getCategoriesById(ids): string {
		return this.categories
			.filter(item => ids.includes(item.id))
			.map(item => item.name)
			.join(', ');
	}
}
