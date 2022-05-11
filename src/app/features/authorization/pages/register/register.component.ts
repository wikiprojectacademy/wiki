import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { GOOGLE_ICON } from 'src/assets/icons/googleIcon';
import { passwordValidation } from '@shared/validators/validations';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	public registerForm: FormGroup;
	public isPasswordHidden: boolean = true;

	constructor(
		private iconRegistry: MatIconRegistry,
		private sanitizer: DomSanitizer,
		private router: Router,
		private authService: AuthorizationService
	) {
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
			password: new FormControl(null, [Validators.required, passwordValidation])
		});
	}

	onSubmit() {
		this.authService.registerUser(this.registerForm.value).then(result => {
			if (result?.isValid === false) {
				console.log('result.message: ', result.message);
			} else {
				this.registerForm.reset();
				this.router.navigate(['/main']);
			}
		});
	}

	onGoogleAuth() {
		this.authService.registerUserWithGoogle().then(result => {
			if (result?.isValid === false) {
				console.log('result.message: ', result.message);
			} else {
				this.registerForm.reset();
				this.router.navigate(['/main']);
			}
		});
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
