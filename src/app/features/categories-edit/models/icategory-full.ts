import { ICategory } from '@core/models/Category';
import { ISubCategory as Subcategory } from '@core/models/SubCategory';
import { IRole as Role } from '@core/models/Role';
import { IUserInCategory as User } from './userInCategory.interface';

export interface ICategoryFull extends ICategory {
	subCategoriesFull?: Subcategory[];
	rolesFull?: Role[];
	createdByFull?: User;
	postAmout?: number;
}
