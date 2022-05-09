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
	subCategories: ISubCategory[];
	availableRolesToView: IRole[];
}
