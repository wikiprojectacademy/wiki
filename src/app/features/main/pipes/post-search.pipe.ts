import { Pipe, PipeTransform } from '@angular/core';
import { PostFull } from '../models/PostFull.interface';

@Pipe({
	name: 'postSearch'
})
export class PostSearchPipe implements PipeTransform {
	transform(posts: PostFull[], searchText: string): PostFull[] {
		return posts.filter(
			post =>
				post.title.toLocaleLowerCase().includes(searchText.toLowerCase()) ||
				post.contentHTML.toLocaleLowerCase().includes(searchText.toLowerCase())
		);
	}
}
