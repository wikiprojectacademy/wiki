import { Component } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { passwordValidation } from '@shared/validators/validations';
import { SnackBarService } from '@shared/services/snackbar.service';
import { RoleService } from '../../../role/services/role.service';

@Component({
	selector: 'app-user-add',
	templateUrl: './user-add.component.html',
	styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {
	public form: FormGroup;
	public isHide: boolean = true;
	public isConfirmHide: boolean = true;
	public roles = [];

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private router: Router,
		private snackBService: SnackBarService,
		private roleService: RoleService
	) {
		this.getRoles();
		this.form = formBuilder.group({
			firstName: [
				'',
				[Validators.required, Validators.minLength(2), Validators.maxLength(25)]
			],
			lastName: [
				'',
				[Validators.required, Validators.minLength(2), Validators.maxLength(25)]
			],
			email: ['', [Validators.required, Validators.email]],
			password: [
				'',
				[
					Validators.required,
					passwordValidation,
					control => this.validatePasswords(control, 'password1')
				]
			],
			confirmPassword: [
				'',
				[
					Validators.required,
					control => this.validatePasswords(control, 'password2')
				]
			],
			roleId: ['']
		});
	}

	get password(): AbstractControl {
		return this.form.get('password');
	}

	get confirmPassword(): AbstractControl {
		return this.form.get('confirmPassword');
	}

	getRoles(): void {
		this.roles = this.roleService.getRolesOption();
	}

	validatePasswords(control: AbstractControl, name: string) {
		if (
			this.form === undefined ||
			this.password.value === '' ||
			this.confirmPassword.value === ''
		) {
			return null;
		} else if (this.password.value === this.confirmPassword.value) {
			if (
				name === 'password' &&
				this.confirmPassword.hasError('passwordMismatch')
			) {
				this.password.setErrors(null);
				this.confirmPassword.updateValueAndValidity();
			} else if (
				name === 'confirmPassword' &&
				this.password.hasError('passwordMismatch')
			) {
				this.confirmPassword.setErrors(null);
				this.password.updateValueAndValidity();
			}
			return null;
		} else {
			return {
				passwordMismatch: { value: 'The provided passwords do not match' }
			};
		}
	}

	addUser(): void {
		if (this.form.valid) {
			this.userService.addUser(this.form.value);
			this.router.navigate(['/user']);
		} else {
			this.snackBService.openSnackBar(
				'To create a user, you must correctly fill in all required fields'
			);
		}
	}
}