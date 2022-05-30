import { IUser } from '@core/models/User';
import { IRole } from '@core/models/Role';
import { IPost } from '@core/models/Post';
import { ICategory } from '@core/models/Category';
import { ISubCategory } from '@core/models/SubCategory';
import { IRoleCategoryPair } from '@core/models/RoleCategoryPair';

// How admin role looks like
const admin = {
	// Admin
	id: '0',
	name: 'super admin',
	hasUsers: true,
	canModifyCategory: true,
	canModifyPost: true
};

// Roles
export const rolesMock: IRole[] = [
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
	// New registered user
	{
		id: '2',
		email: 'user1@mail.com',
		firstName: 'default',
		lastName: 'user',
		password: 'password12345',
		roleId: '1'
	},
	{
		id: '3',
		email: 'user2@mail.com',
		firstName: 'default',
		lastName: 'user',
		password: 'password12345',
		roleId: '1'
	}
];

// Categories
export const categoriesMock: ICategory[] = [
	{
		id: '6',
		name: 'Programming Languages',
		createdBy: '2',
		subCategories: ['lang-1', 'lang-2']
	},
	{
		id: '7',
		name: 'Automobiles',
		createdBy: '2',
		subCategories: ['auto-1', 'auto-2', 'auto-3']
	},
	{
		id: '8',
		name: 'Notebooks',
		createdBy: '3',
		subCategories: ['note-1', 'note-2', 'note-3', 'note-4']
	},
	{
		id: '9',
		name: 'Animals',
		createdBy: '3',
		subCategories: ['animal-1', 'animal-2', 'animal-3', 'animal-4']
	}
];

// Sub Categories
export const subCategoriesMock: ISubCategory[] = [
	{
		id: 'lang-1',
		name: 'Backend'
	},
	{
		id: 'lang-2',
		name: 'Frontend'
	},
	{
		id: 'note-1',
		name: 'HP'
	},
	{
		id: 'note-2',
		name: 'Lenovo'
	},
	{
		id: 'note-3',
		name: 'Apple'
	},
	{
		id: 'note-4',
		name: 'Acer'
	},
	{
		id: 'animal-1',
		name: 'Cats'
	},
	{
		id: 'animal-2',
		name: 'Dogs'
	},
	{
		id: 'animal-3',
		name: 'Lions'
	},
	{
		id: 'animal-4',
		name: 'Crocodiles'
	},
	{
		id: 'car-1',
		name: 'Tesla'
	}
];

// Junction Role Category
export const roleCategoryMocks: IRoleCategoryPair[] = [
	{
		categoryId: '6',
		roleId: '1'
	},
	{
		categoryId: '7',
		roleId: '1'
	},
	{
		categoryId: '8',
		roleId: '1'
	},
	{
		categoryId: '9',
		roleId: '1'
	}
];

export const postsMock: IPost[] = [
	{
		id: '15',
		title: 'Java',
		contentHTML: 'OOP oriented language',
		categoryId: '6',
		subCategory: 'lang-1'
	},
	{
		id: '16',
		title: 'Java Script',
		contentHTML: 'Runs inside browser',
		categoryId: '6',
		subCategory: 'lang-2'
	},
	{
		id: '17',
		title: 'Apple M1 PRO',
		contentHTML: 'The most powerful processor',
		categoryId: '8',
		subCategory: 'note-3'
	},
	{
		id: '18',
		title: 'Lenovo Ideapad 310-15 IKB',
		contentHTML: 'Ideal for studying',
		categoryId: '8',
		subCategory: 'note-2'
	},
	{
		id: '19',
		title: 'British',
		contentHTML: 'Programmers love cats',
		categoryId: '6',
		subCategory: 'animal-1'
	},
	{
		id: '20',
		title: 'M40',
		contentHTML: 'Машина для пацанів',
		categoryId: '7',
		subCategory: 'car-1'
	},
	{
		id: '21',
		title: 'Post without subcategory',
		contentHTML: 'It is a general description of animals',
		categoryId: '9'
	}
];
