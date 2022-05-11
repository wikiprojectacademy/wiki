import { ICategory } from '@core/models/Category';
import { IPermission } from '@core/models/Permission';

/**
 * Main models to describe Role entity
 * Relation between Role to Permission -> One to Many
 * Relation between Role to Category -> Many to Many
 */
export interface IRole {
	id?: string;
	name?: string; // moderator, super admin, editor
	type: 'admin' | 'user' | 'guest';
	permissions: string[]; // array of permissions;
	availableCategoriesToView?: ICategory[]; // Value should be fetched from junction collection: 'junction_role_category'
}
