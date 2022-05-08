/**
 * Main models to describe Permission entity
 * Relation between Permission to Role -> Many to One
 */
export interface IPermission {
	type: 'category' | 'post';
	add: boolean;
	edit: boolean;
	delete: boolean;
}
