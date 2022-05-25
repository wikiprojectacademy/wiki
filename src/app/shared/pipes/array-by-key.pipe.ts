import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'arrayByKey'
})
export class ArrayByKeyPipe implements PipeTransform {
	transform(array: any[], key: string = 'name'): string {
		if (!array) {
			return '-';
		}
		return array.map(item => item[key]).join(', ');
	}
}
