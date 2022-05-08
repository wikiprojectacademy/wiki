import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	public loginForm: FormGroup;
	public hide: boolean = true;

	public passwordRegexp: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

	constructor() {
		this.loginForm = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, [
				Validators.required,
				Validators.pattern(this.passwordRegexp)
			])
		});
	}

	onSubmit() {
		console.log('loginForm: ', this.loginForm);
		console.log('loginForm: ', this.loginForm.value);
		this.loginForm.reset();
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
