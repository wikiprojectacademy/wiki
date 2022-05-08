import { IRole } from '@core/models/Role';

/**
 * Main models to describe SubCategory entity
 * Relation between SubCategory to Category -> Many to One
 */
export interface ISubCategory {
	name: string;
	availableRolesToView?: IRole[];
}
