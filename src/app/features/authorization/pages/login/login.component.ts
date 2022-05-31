import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
		private router: Router,
		private authService: AuthorizationService,
		private snack: SnackBarService
	) {
		this.loginForm = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, [Validators.required, passwordValidation])
		});
	}

	onSubmit() {
		this.isLoading = true;
		this.authService
			.loginUserFromDatabase(
				this.loginForm.value.email,
				this.loginForm.value.password
			)
			.then(result => {
				this.isLoading = false;

				if (result.isValid === false) {
					this.snack.openSnackBar(result.message);
				} else {
					this.loginForm.reset();
					this.isLoading = false;
					this.router.navigate(['/main']);
				}
			})
			.catch(error => {
				this.isLoading = false;
				this.snack.openSnackBar(error);
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
