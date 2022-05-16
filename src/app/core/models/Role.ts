/**
 * Main models to describe Role entity
 * Relation between Role to Permission -> One to Many
 * Relation between Role to Category -> Many to Many
 */
export interface IRole {
	id?: string;
	name?: string; // moderator, super admin, editor
	hasUsers: boolean;
	canModifyCategory: boolean;
	canModifyPost: boolean;
	availableCategoriesToView?: string[]; // Value should be fetched from junction collection: 'junction_role_category'
	// It should return all records, where roleId === to current roleId
}
