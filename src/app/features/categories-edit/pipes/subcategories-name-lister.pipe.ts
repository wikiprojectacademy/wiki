import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'subcategoriesNameLister'
})
export class SubcategoriesNameListerPipe implements PipeTransform {
	transform(subCategories: any[]): string {
		if (!subCategories) return ' - ';
		return subCategories.map(sub => sub.name).join(', ');
	}
}
