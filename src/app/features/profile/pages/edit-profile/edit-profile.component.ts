import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from '@core/models/User';
import { passwordValidation } from '@shared/validators/validations';
import { DataService } from 'src/app/features/profile/service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
	isPasswordHidden: boolean = true;
	user: IUser;
	private subscription: Subscription;

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
	) {}

	ngOnInit(): void {
		console.log('Edit Profile onInit execute');

		// data from currentUserService.currentUser$
		this.currentUserService.currentUser$.subscribe((curUser: IUser) => {
			this.user = curUser;
			this.changeProfileForm.patchValue(this.user);
		});
	}

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

	submitResult() {
		// update user inside firestorage
		this.dataService
			.updateUser('eqeNMsxzJFbw4odMXSk3KS7gWjv1', this.changeProfileForm.value)
			// .updateUser(this.user.id, this.changeProfileForm.value)
			.then(() => {
				// console.log(`updateUser`);
				this.dialog.open(SubmitDialogComponent);
			});
		this.changeProfileForm.markAsPristine();

		// Todo update user inside Auth base

		// Todo somehow update currentUser& in currentUserService
		// because after updating data in DB
		// and reloading page we use currentUser& data
	}

	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
