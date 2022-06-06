import { IPost as Post } from '@core/models/Post';

export interface PostFull extends Post {
	categoryName?: string;
	subCategoryName?: string;
}
