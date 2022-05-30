/**
 * Main models that describe User entity
 * Relation between User and Role -> Many to One
 * The required fields only id and role, because guest doesn't have first, last
 * name, email and password.
 */
export interface IUser {
	id?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
	roleId?: string;
	isActivated?: boolean;
	roleName?: string;
	isAdmin?: boolean;
}
