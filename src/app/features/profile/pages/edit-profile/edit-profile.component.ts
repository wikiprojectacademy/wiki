import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from '@core/models/User';
import { passwordValidation } from '@shared/validators/validations';
import { DataService } from 'src/app/features/profile/service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog';
import { CurrentUserService } from '@core/services/user/current-user.service';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
	isPasswordHidden: boolean = true;
	user: IUser;
	userId: string;

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

	constructor(
		private dataService: DataService,
		public dialog: MatDialog,
		private currentUserService: CurrentUserService
	) {
		console.log(
			this.currentUserService.currentUser$.subscribe(curUser =>
				console.log(curUser.id)
			)
		);
		this.currentUserService.currentUser$.subscribe(
			curUser => (this.userId = curUser.id)
		);
		// this.currentUserService.currentUser$.subscribe(curUser => this.userId = curUser.id);
	}

	ngOnInit(): void {
		if (localStorage.getItem('curUser')) {
			// this.user = JSON.parse(localStorage.getItem('curUser'));
			// this.changeProfileForm.patchValue(this.user);

			this.changeProfileForm.patchValue(
				JSON.parse(localStorage.getItem('curUser'))
			);
			// console.log('Get data from session storage');
		} else {
			// console.log('Get data from fise store');
			this.dataService
				// .getUser(here must be id from current user)
				.getUser('d5lRYhxnFibepXPUlCEp')
				.subscribe((data: IUser) => {
					this.user = data;
					localStorage.setItem('curUser', JSON.stringify(this.user));
					this.changeProfileForm.patchValue(this.user);
				});
		}

		// data from firestore
		// this.dataService
		// 	.getUser(this.currentUserService.user.id)
		// 	.subscribe((data: IUser) => {
		// 		this.user = data;
		// 		this.changeProfileForm.patchValue(this.user);
		// 	})
		console.log('Edit Profile onInit execute');

		// data from currentUserService.currentUser$
		// this.currentUserService.currentUser$.subscribe((curUser: IUser) => {
		// 	this.user = curUser;
		// 	this.changeProfileForm.patchValue(this.user);
		// });

		// data from currentUserService.user
		// this.changeProfileForm.patchValue(this.currentUserService.user);
	}

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

	// changeProfile() {
	// this.dataService.updateUser(
	// 	`${this.currentUserService.user.id}`,
	// 	// 'd5lRYhxnFibepXPUlCEp',
	// 	this.changeProfileForm.value
	// );
	// console.log(this.changeProfileForm.value);
	// console.log(this.user);
	// }

	submitResult() {
		// console.log(this.userId);
		// this.dataService
		// 	.updateUser(
		// 	// .getUser(`${this.currentUserService.currentUser$.subscribe(curUser => {return curUser.id})}`)
		// 		`${this.currentUserService.user.id}`,
		// 		this.changeProfileForm.value
		// 	)

		// update user inside base
		// 	this.dataService
		// 		.updateUser(this.userId, this.changeProfileForm.value)
		// 		.then(() => {
		// 			console.log(`updateUser`);
		// 			this.dialog.open(SubmitDialogComponent);
		// 		});
		// 	this.changeProfileForm.markAsPristine();
		// }

		// update user inside base
		this.dataService
			.updateUser(this.currentUserService.user.id, this.changeProfileForm.value)
			.then(() => {
				localStorage.removeItem('curUser');
				// localStorage.setItem('curUser', JSON.stringify(this.user));
				// localStorage.setItem('curUser', JSON.stringify(this.changeProfileForm.value));
				console.log(`User updated`);
				this.dialog.open(SubmitDialogComponent);
			});
		this.changeProfileForm.markAsPristine();

		// update data in currentUser doesn`t work
		// this.currentUserService.user.firstName = this.changeProfileForm.value.firstName
	}
}
