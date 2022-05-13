import { ISubCategory } from '@core/models/SubCategory';
import { IRole } from '@core/models/Role';

/**
 * Main models to describe Category entity
 * Relation between Category to SubCategory -> One to Many
 * Relation between Category to Role -> Many to Many
 */
export interface ICategory {
	id?: string;
	name: string;
	createdBy: string; // Id of user who is created category
	subCategories?: string[]; // Id's of subcategories
	availableRolesToView?: string[]; // Id's of roles, for which this category posts available for view,
	// Value should be fetched from junction collection: 'junction_role_category'
}
