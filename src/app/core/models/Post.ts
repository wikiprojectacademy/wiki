import { ICategory } from '@core/models/Category';
import { ISubCategory } from '@core/models/SubCategory';

/**
 * Main models to describe Post entity
 * Relation between Post to Category | SubCategory -> Many to One
 */
export interface IPost {
	title: string;
	contentHTML: string;
	category?: ICategory;
	subCategory?: ISubCategory;
}
