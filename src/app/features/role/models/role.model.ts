export interface IRoleModel {
	id: string;
	name: string;
	hasUsers: boolean;
	modificationCategory: boolean;
	modificationPost: boolean;
	availableCategoryIdsToView: string[];
}
