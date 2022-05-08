import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PASSWORD_REGEXP } from 'src/app/features/authorization/models/passwordRegExp';
@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
	changeProfileForm: any;
	isPasswordHidden: boolean = true;

	constructor() {}

	ngOnInit(): void {
		this.changeProfileForm = new FormGroup({
			firstName: new FormControl('Data.firstName', [
				Validators.required,
				Validators.minLength(2)
				// Validators.maxLength(25)
			]),
			lastName: new FormControl('Data.lastName', [
				Validators.required,
				Validators.minLength(2)
				// Validators.maxLength(25)
			]),
			email: new FormControl('Data.email', [
				Validators.required,
				Validators.email
			]),
			password: new FormControl('Data.password', [
				Validators.required,
				Validators.pattern(PASSWORD_REGEXP)
				// Validators.maxLength(25)
			])
		});
	}

	getNameErrorMessage(inputField: string) {
		if (this.changeProfileForm.hasError('required', inputField)) {
			return 'Required field';
		} else if (this.changeProfileForm.hasError('minlength', inputField)) {
			return 'Minimum length is 2 characters';
			// } else if (this.changeProfileForm.hasError('maxlength', inputField)) {
			// 	return 'Maximum length is 25 characters';
		} else if (this.changeProfileForm.hasError('email', inputField)) {
			return 'Not a valid email';
		} else if (this.changeProfileForm.hasError('pattern', inputField)) {
			return 'The	password must contain minimum six	characters, at least one letter and one number';
		} else return;
	}

	changeProfile() {
		console.log(this.changeProfileForm.value);
	}
}
