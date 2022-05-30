import { ISubCategory } from '@core/models/SubCategory';

export class CategoryViewModel {
	id: string;
	name: string;
	subCategories: ISubCategory[];
}
