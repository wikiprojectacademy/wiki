import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from '@core/models/User';
import { passwordValidation } from '@shared/validators/validations';
import { MatDialog } from '@angular/material/dialog';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { Subscription, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserFirebaseService } from '@core/services/firebase/firebase-entities/userFirebase.service';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
	isPasswordHidden: boolean = true;
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
		private userFirebaseService: UserFirebaseService,
		public dialog: MatDialog,
		private currentUserService: CurrentUserService,
		private afAuth: AngularFireAuth,
		private userFireStore: UserFirebaseService
	) {}

	ngOnInit(): void {
		// Contain data from currentUser in FormGroup values
		this.currentUserService.currentUser$.subscribe((curUser: IUser) => {
			this.changeProfileForm.patchValue(curUser);
		});
	}

	submitResult() {
		// Update current user data in firestorage by id
		this.userFirebaseService
			.updateUser('eqeNMsxzJFbw4odMXSk3KS7gWjv1', this.changeProfileForm.value)
			// .updateUser(this.user.id, this.changeProfileForm.value)
			.then(() => {
				this.dialog.open(SubmitDialogComponent);
			});
		this.changeProfileForm.markAsPristine();

		// Todo update user inside Auth base

		// Update currentUser data inside currentUserService
		this.currentUserService.currentUser$ = this.afAuth.user.pipe(
			switchMap(user => this.userFireStore.getUserData(user.uid))
		);
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

	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
