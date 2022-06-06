import { Pipe, PipeTransform } from '@angular/core';
import { IPost as Post } from '@core/models/Post';
import { PostFull } from '../models/PostFull.interface';

@Pipe({
	name: 'postFilter'
})
export class PostFilterPipe implements PipeTransform {
	transform(
		posts: PostFull[],
		categoryID: string,
		subCategoryId: string
	): PostFull[] {
		if (!posts) return [];
		if (categoryID == 'all') {
			return posts;
		}
		if (subCategoryId) {
			return posts.filter(post => post.subCategory == subCategoryId);
		}
		return posts.filter(post => post.categoryId == categoryID);
	}
}
