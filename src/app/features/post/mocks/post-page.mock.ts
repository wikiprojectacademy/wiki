import { ICategory as Category } from '@core/models/Category';

export const CategoriesMock: Category[] = [
	{
		id: 'category-id-00',
		name: 'First Category',
		createdBy: '',
		subCategories: ['firstSubCategory'],
		availableRolesToView: []
	},
	{
		id: 'category-id-01',
		name: 'Second Category',
		createdBy: '',
		subCategories: ['secondSubCategory'],
		availableRolesToView: []
	}
];
