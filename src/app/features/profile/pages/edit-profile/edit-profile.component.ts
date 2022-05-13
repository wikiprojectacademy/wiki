import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUser } from '@core/models/User';
import { passwordValidation } from '@shared/validators/validations';
import { DataService } from '@core/services/data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
	changeProfileForm: any;
	isPasswordHidden: boolean = true;
	usser: Observable<IUser>;
	// user: IUser = {
	// 	id: 2,
	// 	firstName: 'Ivan',
	// 	lastName: 'Ivanov',
	// 	email: 'ivanivanov@gmail.com',
	// 	password: 'rgfhfgh323fd',
	// 	role: {
	// 		id: '1',
	// 		type: 'user',
	// 		availableCategoriesToView: [],
	// 		permissions: []
	// 	}
	// };
	user: IUser;
	constructor(private dataService: DataService) {
		this.usser = dataService.getUser('d5lRYhxnFibepXPUlCEp');
	}

	ngOnInit(): void {
		this.changeProfileForm = new FormGroup({
			firstName: new FormControl(`${this.user.firstName}`, [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(25)
			]),
			lastName: new FormControl(`${this.user.lastName}`, [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(25)
			]),
			email: new FormControl(`${this.user.email}`, [
				Validators.required,
				Validators.email
			]),
			password: new FormControl(`${this.user.password}`, [
				Validators.required,
				passwordValidation,
				Validators.maxLength(25)
			])
		});

		// this.usser.subscribe((data: IUser) => (this.user = data));
	}

	// 	getData()  {
	// this.usser.subscribe((data: IUser) => (this.user = data));
	// }
	getNameErrorMessage(inputField: string) {
		if (this.changeProfileForm.hasError('required', inputField)) {
			return 'Required field';
		} else if (this.changeProfileForm.hasError('minlength', inputField)) {
			return 'Minimum length is 2 characters';
		} else if (this.changeProfileForm.hasError('maxlength', inputField)) {
			return 'Maximum length is 25 characters';
		} else if (this.changeProfileForm.hasError('email', inputField)) {
			return 'Not a valid email';
		} else if (this.changeProfileForm.hasError('pattern', inputField)) {
			return 'The	password must contain minimum six	characters, at least one letter and one number';
		} else return '';
	}

	changeProfile() {
		this.dataService.updateUser(
			'd5lRYhxnFibepXPUlCEp',
			this.changeProfileForm.value
		);
		// console.log(this.changeProfileForm.value);
		// console.log(this.user);
	}
}
