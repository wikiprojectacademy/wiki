import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { GOOGLE_ICON } from 'src/assets/icons/googleIcon';
import { passwordValidation } from '@shared/validators/validations';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { SnackBarService } from '@shared/services/snackbar.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	public loginForm: FormGroup;
	public isPasswordHidden: boolean = true;
	public isLoading: boolean = false;

	constructor(
		private iconRegistry: MatIconRegistry,
		private sanitizer: DomSanitizer,
		private router: Router,
		private authService: AuthorizationService,
		private snack: SnackBarService
	) {
		iconRegistry.addSvgIconLiteral(
			'google',
			sanitizer.bypassSecurityTrustHtml(GOOGLE_ICON)
		);

		this.loginForm = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, [Validators.required, passwordValidation])
		});
	}

	onSubmit() {
		this.isLoading = true;
		this.authService
			.loginUser(this.loginForm.value.email, this.loginForm.value.password)
			.then(result => {
				this.isLoading = false;

				if (result?.isValid === false) {
					// console.log('result.message: ', result.message);
					this.snack.openSnackBar(result.message);
				} else {
					this.loginForm.reset();
					this.isLoading = false;
					this.router.navigate(['/main']);
				}
			});
	}

	onGoogleAuth() {
		this.authService.registerUserWithGoogle().then(result => {
			if (result?.isValid === false) {
				// console.log('result.message: ', result.message);
				this.snack.openSnackBar(result.message);
			} else {
				this.router.navigate(['/main']);
			}
		});
	}

	getErrorMessage(inputField: string): string {
		if (this.loginForm.hasError('required', inputField)) {
			return 'You must enter a value';
		}
		if (this.loginForm.hasError('email', inputField)) {
			return 'Not a valid email';
		}
		if (this.loginForm.hasError('pattern', inputField)) {
			return 'The	password must contain minimum six	characters, at least one letter and one number';
		}

		return '';
	}
}
