import { Pipe, PipeTransform } from '@angular/core';
import { IPost as Post } from '@core/models/Post';

@Pipe({
	name: 'postFilter'
})
export class PostFilterPipe implements PipeTransform {
	transform(posts: Post[], categoryID: string, subCategoryId: string): Post[] {
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
