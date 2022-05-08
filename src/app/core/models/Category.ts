import { ISubCategory } from '@core/models/SubCategory';
import { IRole } from '@core/models/Role';

/**
 * Main models to describe Category entity
 * Relation between Category to SubCategory -> One to Many
 * Relation between Category to Role -> Many to Many
 */
export interface ICategory {
	name: string;
	subCategories: ISubCategory[];
	availableRolesToView: IRole[];
}
