import { IUser } from '@core/models/User';
import { IRole } from '@core/models/Role';
import { IPost } from '@core/models/Post';
import { ICategory } from '@core/models/Category';
import { ISubCategory } from '@core/models/SubCategory';
import { IRoleCategoryPair } from '@core/models/RoleCategoryPair';

// Roles
export const rolesMock: IRole[] = [
	{
		// Admin
		id: '0',
		name: 'super admin',
		hasUsers: true,
		canModifyCategory: true,
		canModifyPost: true
	},
	// New created user role
	{
		id: '1',
		name: 'user',
		hasUsers: true,
		canModifyCategory: false,
		canModifyPost: false
	}
];

// Users
export const usersMock: IUser[] = [
	// Administrator
	{
		id: '0',
		email: 'super.admin@gmail.com',
		firstName: 'super',
		lastName: 'admin',
		password: 'admin12345',
		roleId: '0'
	},
	// New registered user
	{
		id: '3',
		email: 'user1@mail.com',
		firstName: 'default',
		lastName: 'user',
		password: 'password123',
		roleId: '1'
	},
	{
		id: '4',
		email: 'user2@mail.com',
		firstName: 'default',
		lastName: 'user',
		password: 'password12345',
		roleId: '1'
	},
	{
		id: '5',
		email: 'user3@mail.com',
		firstName: 'default',
		lastName: 'user',
		password: 'password123456789',
		roleId: '1'
	}
];

// Categories
export const categoriesMock: ICategory[] = [
	{
		id: '6',
		name: 'Programming Languages',
		createdBy: '2',
		subCategories: ['5', '6'],
		availableRolesToView: ['2']
	},
	{
		id: '7',
		name: 'Automobiles',
		createdBy: '2',
		subCategories: [],
		availableRolesToView: ['3']
	},
	{
		id: '8',
		name: 'Notebooks',
		createdBy: '2',
		subCategories: ['11', '12', '13', '14'],
		availableRolesToView: ['3']
	}
];

// Junction Role Category
export const roleCategoryMocks: IRoleCategoryPair[] = [
	{
		categoryId: '4',
		roleId: '2'
	},
	{
		categoryId: '9',
		roleId: '3'
	},
	{
		categoryId: '8',
		roleId: '3'
	}
];

// Sub Categories
export const subCategoriesMock: ISubCategory[] = [
	{
		id: '9',
		name: 'Backend'
	},
	{
		id: '10',
		name: 'Frontend'
	},
	{
		id: '11',
		name: 'HP'
	},
	{
		id: '12',
		name: 'Lenovo'
	},
	{
		id: '13',
		name: 'Apple'
	},
	{
		id: '14',
		name: 'Acer'
	}
];

export const postsMock: IPost[] = [
	{
		id: '15',
		title: 'Java',
		contentHTML: 'OOP oriented language',
		categoryId: '6',
		subCategory: '9'
	},
	{
		id: '16',
		title: 'Java Script',
		contentHTML: 'Runs inside browser',
		categoryId: '6',
		subCategory: '10'
	},
	{
		id: '17',
		title: 'Apple M1 PRO',
		contentHTML: 'The most powerful processor',
		categoryId: '8',
		subCategory: '13'
	}
];
