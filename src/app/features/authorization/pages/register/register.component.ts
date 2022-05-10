import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { GOOGLE_ICON } from '../../../../../assets/icons/googleIcon';
import { PASSWORD_REGEXP } from '../../models/passwordRegExp';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	public registerForm: FormGroup;
	public isPasswordHidden: boolean = true;

	constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
		iconRegistry.addSvgIconLiteral(
			'google',
			sanitizer.bypassSecurityTrustHtml(GOOGLE_ICON)
		);

		this.registerForm = new FormGroup({
			firstName: new FormControl(null, [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(25)
			]),
			lastName: new FormControl(null, [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(25)
			]),
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, [
				Validators.required,
				Validators.pattern(PASSWORD_REGEXP)
			])
		});
	}

	onSubmit() {
		// console.log('registerForm: ', this.registerForm.value);
		this.registerForm.reset();
	}

	onGoogleAuth() {
		// console.log('Auth with google');
	}

	getNameErrorMessage(inputField: string): string {
		if (this.registerForm.hasError('required', inputField)) {
			return 'You must enter a value';
		}
		if (this.registerForm.hasError('minlength', inputField)) {
			return 'The minimum length for this field is 2 characters';
		}
		if (this.registerForm.hasError('email', inputField)) {
			return 'Not a valid email';
		}
		if (this.registerForm.hasError('pattern', inputField)) {
			return 'The	password must contain minimum six	characters, at least one letter and one number';
		}

		return '';
	}
}
