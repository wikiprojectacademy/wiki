import { ICategory } from '@core/models/Category';
import { IPermission } from '@core/models/Permission';

/**
 * Main models to describe Role entity
 * Relation between Role to Permission -> One to Many
 * Relation between Role to Category -> Many to Many
 */
export interface IRole {
	type: 'admin' | 'user' | 'guest';
	permissions: IPermission[];
	availableCategoriesToView: ICategory[];
}
