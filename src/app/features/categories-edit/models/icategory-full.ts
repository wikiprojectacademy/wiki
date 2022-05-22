import { ICategory } from '@core/models/Category';
import { ISubCategory as Subcategory } from '@core/models/SubCategory';
import { IRole as Role } from '@core/models/Role';
import { User } from 'firebase/auth';

export interface ICategoryFull extends ICategory {
	subCategoriesFull?: Subcategory[];
	rolesFull?: Role[];
	createdByFull?: User;
}
