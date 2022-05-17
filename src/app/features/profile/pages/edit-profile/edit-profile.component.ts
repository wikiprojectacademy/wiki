import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from '@core/models/User';
import { passwordValidation } from '@shared/validators/validations';
import { DataService } from 'src/app/features/profile/service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
	isPasswordHidden: boolean = true;
	user: IUser;
	// subscription: Subscription;

	changeProfileForm: FormGroup = new FormGroup({
		firstName: new FormControl('', [
			Validators.required,
			Validators.minLength(2),
			Validators.maxLength(25)
		]),
		lastName: new FormControl('', [
			Validators.required,
			Validators.minLength(2),
			Validators.maxLength(25)
		]),
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [
			Validators.required,
			passwordValidation,
			Validators.maxLength(25)
		])
	});

	constructor(private dataService: DataService, public dialog: MatDialog) {}

	ngOnInit(): void {
		// this.dataService
		// 	.getUser('d5lRYhxnFibepXPUlCEp')
		// 	.subscribe((data: IUser) => (this.user = data));

		this.dataService
			// .getUser(`${this.user.id}`)
			.getUser('d5lRYhxnFibepXPUlCEp')
			.subscribe(
				(data: IUser) => {
					this.user = data;
					this.changeProfileForm.patchValue(this.user);
					// this.getUserById();
				}
				// (error: any) => console.error('Observer got an error: ' + error),
				// () => console.log('Done getting user')
			);

		// this.dataService
		// 	// .getUser(`${this.user.id}`)
		// 	.getUser('d5lRYhxnFibepXPUlCEp')
		// 	.subscribe((data: IUser) => {
		// 		this.user = data;
		// 		this.changeProfileForm.patchValue(this.user);
		// 		// this.getUserById();
		// 	});

		// this.subscription = this.dataService
		// 	// .getUser(`${this.user.id}`)
		// 	.getUser('d5lRYhxnFibepXPUlCEp')
		// 	.subscribe(data => {
		// 		this.user = data;
		// 		this.getUserById();
		// 	});
	}

	// getUserById(): void {
	// 	this.changeProfileForm.patchValue(this.user);
	// }

	// getData() {
	// 	this.changeProfileForm.patchValue({
	// 		firstName: this.user.firstName,
	// 		lastName: this.user.lastName,
	// 		email: this.user.email,
	// 		password: this.user.password
	// 	});
	// 	// console.log(this.user);
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
			// `${this.user.id}`,
			'd5lRYhxnFibepXPUlCEp',
			this.changeProfileForm.value
		);
		console.log(this.changeProfileForm.value);
		// console.log(this.user);
	}

	submitResult() {
		this.dataService.updateUser(
			// `${this.user.id}`,
			'd5lRYhxnFibepXPUlCEp',
			this.changeProfileForm.value
		);
		this.dialog.open(SubmitDialogComponent);
		this.changeProfileForm.markAsPristine();
	}
}
