import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'tagRemove'
})
export class TagRemovePipe implements PipeTransform {
	transform(htmlText: string): string {
		let result = '';
		let braceCounter = 0;
		htmlText.split('').forEach(letter => {
			if (letter == '<') braceCounter++;
			if (braceCounter <= 0) result += letter;
			if (letter == '>') braceCounter--;
		});
		return result;
	}
}
