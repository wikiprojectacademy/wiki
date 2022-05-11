import { IUser } from '@core/models/User';
import { IRole } from '@core/models/Role';
import { IPost } from '@core/models/Post';
import { ICategory } from '@core/models/Category';

const role: IRole = {
	id: '1',
	type: 'guest',
	availableCategoriesToView: [],
	permissions: []
};

const defaultData: IUser = {
	id: 0,
	email: 'test@mail.com',
	firstName: 'test',
	lastName: 'secondName',
	password: 'password',
	role: role
};

const features: ICategory = {
	name: 'Features',
	createdBy: '0',
	availableRolesToView: [],
	subCategories: []
};
