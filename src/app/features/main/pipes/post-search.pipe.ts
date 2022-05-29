import { Pipe, PipeTransform } from '@angular/core';
import { IPost as Post } from '@core/models/Post';

@Pipe({
	name: 'postSearch'
})
export class PostSearchPipe implements PipeTransform {
	transform(posts: Post[], categoryID: string, subCategoryId: string): Post[] {
		if (categoryID == 'all') {
			return posts;
		} else if (subCategoryId) {
			console.log('clicked on subcat');
			return posts.filter(post => post.subCategory == subCategoryId);
		} else {
			return posts.filter(post => post.categoryId == categoryID);
		}
	}
}
