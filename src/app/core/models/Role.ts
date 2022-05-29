import { ICategory } from '@core/models/Category';

/**
 * Main models to describe Role entity
 * Relation between Role to Permission -> One to Many
 * Relation between Role to Category -> Many to Many
 */
export interface IRole {
	id?: string;
	name?: string;
	hasUsers?: boolean;
	canModifyCategory?: boolean;
	canModifyPost?: boolean;
	availableCategoriesToView?: ICategory[];
	categories?: string[];
}
