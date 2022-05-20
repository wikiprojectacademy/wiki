import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'subcategoriesNameLister'
})
export class SubcategoriesNameListerPipe implements PipeTransform {
	transform(value: any[], ...args: unknown[]): unknown {
		return value.map(sub => sub.name).join(', ');
	}
}
