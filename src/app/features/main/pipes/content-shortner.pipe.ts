import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'contentShortner'
})
export class ContentShortnerPipe implements PipeTransform {
	transform(text: string): string {
		// return null;
		const CUT_START = 120;
		if (text.length > CUT_START) {
			return text.slice(0, CUT_START) + '...';
		}
		return text;
	}
}
