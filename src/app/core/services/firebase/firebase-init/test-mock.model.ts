import { IUser } from '@core/models/User';
import { IRole } from '@core/models/Role';
import { ISubCategory } from '@core/models/SubCategory';
import { IRoleCategoryPair } from '@core/models/RoleCategoryPair';
import { IPost } from '@core/models/Post';

export interface TestMock {
	users: IUser[];
	roles: IRole[];
	categories: IFullCategory[];
	roleCategories: IRoleCategoryPair[];
	posts: IPost[];
}

export interface IFullCategory {
	id?: string;
	name: string;
	createdBy: string; // Id of user who is created category
	subCategories?: ISubCategory[];
}
