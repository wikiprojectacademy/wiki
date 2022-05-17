import { IRole } from '@core/models/Role';

/**
 * Main models to describe SubCategory entity
 * Relation between SubCategory to Category -> Many to One
 */
export interface ISubCategory {
	id?: string;
	name: string;
	availableRolesToView?: IRole[]; // Inherited from Category
	// Value should be fetched from junction collection: 'junction_role_category'
}
