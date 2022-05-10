import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'passwordHide'
})
export class PasswordHidePipe implements PipeTransform {
	transform(value: string): string {
		return value.replace(/./g, '*');
	}
}
