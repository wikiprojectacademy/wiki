import { Pipe, PipeTransform } from '@angular/core';
import { IPost as Post } from '@core/models/Post';

@Pipe({
	name: 'postSearch'
})
export class PostSearchPipe implements PipeTransform {
	transform(posts: Post[], searchText: string): Post[] {
		return posts.filter(
			post =>
				post.title.toLocaleLowerCase().includes(searchText.toLowerCase()) ||
				post.contentHTML.toLocaleLowerCase().includes(searchText.toLowerCase())
		);
	}
}
