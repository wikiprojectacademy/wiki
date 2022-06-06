import { Pipe, PipeTransform } from '@angular/core';
import { IPost as Post } from '@core/models/Post';
import { PostFull } from '../models/PostFull.interface';

@Pipe({
	name: 'tagRemove'
})
export class TagRemovePipe implements PipeTransform {
	transform(posts: PostFull[]): PostFull[] {
		posts.forEach(post => {
			let result = '';
			let braceCounter = 0;
			post.contentHTML.split('').forEach(letter => {
				if (letter == '<') braceCounter++;
				if (braceCounter <= 0) result += letter;
				if (letter == '>') braceCounter--;
			});
			post.contentHTML = result;
		});
		// let result = '';
		// let braceCounter = 0;
		// htmlText.split('').forEach(letter => {
		// 	if (letter == '<') braceCounter++;
		// 	if (braceCounter <= 0) result += letter;
		// 	if (letter == '>') braceCounter--;
		// });
		return posts;
	}
}
