import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidation } from '@shared/validators/validations';
import { AuthorizationService } from '../../services/authorization.service';
import { SnackBarService } from '@shared/services/snackbar.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	public registerForm: FormGroup;
	public isPasswordHidden: boolean = true;
	public isLoading: boolean = false;

	constructor(
		private router: Router,
		private authService: AuthorizationService,
		private snack: SnackBarService
	) {
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
		this.isLoading = true;
		this.authService
			.registerUser(this.registerForm.value)
			.then(result => {
				this.isLoading = false;

				if (result.isValid === false) {
					this.snack.openSnackBar(result.message);
				} else {
					this.registerForm.reset();
					this.isLoading = false;
					this.router.navigate(['/main']);
				}
			})
			.catch(error => {
				this.isLoading = false;
				this.snack.openSnackBar(error);
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
