import { ISubCategory } from '@core/models/SubCategory';

/**
 * Main models to describe Post entity
 * Relation between Post to Category | SubCategory -> Many to One
 */
export interface IPost {
	id?: string;
	title: string;
	contentHTML: string;
	categoryId: string; // Id of category
	createdAt?: Date; // creation timestamp
	updatedAt?: Date; // last edit/update timestamp
	subCategory?: string; // Id of subcategory
}
