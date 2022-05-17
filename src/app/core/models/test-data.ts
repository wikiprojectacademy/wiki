import { IUser } from '@core/models/User';
import { IRole } from '@core/models/Role';
import { IPost } from '@core/models/Post';
import { ICategory } from '@core/models/Category';
import { ISubCategory } from '@core/models/SubCategory';
import { IRoleCategoryPair } from '@core/models/RoleCategoryPair';

// Roles

// Admin
export const adminRole: IRole = {
	id: '0',
	name: 'admin',
	hasUsers: false,
	canModifyCategory: true,
	canModifyPost: true
};

// Default
export const defaultUserRole: IRole = {
	id: '1',
	name: 'user',
	hasUsers: false,
	canModifyCategory: true,
	canModifyPost: true
};

// Users

// Administrator
export const adminUser: IUser = {
	id: '2',
	email: 'admin@gmail.com',
	firstName: 'super',
	lastName: 'admin',
	password: 'admin',
	roleId: '0'
};

// New registered user
export const defaultUser: IUser = {
	id: '3',
	email: 'user@mail.com',
	firstName: 'default',
	lastName: 'user',
	password: 'password',
	roleId: '1'
};

// Categories
export const languagesCategory: ICategory = {
	id: '4',
	name: 'Programming Languages',
	createdBy: '2',
	subCategories: ['5', '6'],
	availableRolesToView: ['2']
};

// Junction Role Category
export const roleCategory: IRoleCategoryPair = {
	categoryId: '4',
	roleId: '2'
};

// Sub Categories
export const languagesSubCategories: ISubCategory[] = [
	{
		id: '5',
		name: 'Backend'
	},
	{
		id: '6',
		name: 'Frontend'
	}
];

export const languagesPosts: IPost[] = [
	{
		id: '7',
		title: 'Java',
		contentHTML: 'OOP oriented language',
		categoryId: '4',
		subCategory: '5'
	},
	{
		id: '8',
		title: 'Java Script',
		contentHTML: 'Runs inside browser',
		categoryId: '4',
		subCategory: '6'
	}
];
