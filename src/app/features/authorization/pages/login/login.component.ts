import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { GOOGLE_ICON } from '../../../../../assets/icons/googleIcon';
import { PASSWORD_REGEXP } from '../../models/passwordRegExp';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	public loginForm: FormGroup;
	public hide: boolean = true;

	constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
		iconRegistry.addSvgIconLiteral(
			'google',
			sanitizer.bypassSecurityTrustHtml(GOOGLE_ICON)
		);

		this.loginForm = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, [
				Validators.required,
				Validators.pattern(PASSWORD_REGEXP)
			])
		});
	}

	onSubmit() {
		// console.log('loginForm: ', this.loginForm.value);
		this.loginForm.reset();
	}

	onGoogleAuth() {
		// console.log('Auth with google');
	}

	getErrorMessage(inputField: string): string | undefined {
		if (this.loginForm.hasError('required', inputField)) {
			return 'You must enter a value';
		}
		if (this.loginForm.hasError('email', inputField)) {
			return 'Not a valid email';
		}
		if (this.loginForm.hasError('pattern', inputField)) {
			return 'The	password must contain minimum six	characters, at least one letter and one number';
		}

		return;
	}
}
