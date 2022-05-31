import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	FormGroup,
	FormControl,
	Validators,
	AsyncValidatorFn,
	AbstractControl,
	ValidationErrors
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '@core/models/User';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { UserFirebaseService } from '@core/services/firebase/firebase-entities/userFirebase.service';
import { passwordValidation } from '@shared/validators/validations';
import { SnackBarService } from '@shared/services/snackbar.service';
import { map, Observable, take } from 'rxjs';
import { AuthorizationService } from 'src/app/features/authorization/services/authorization.service';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog';
import { ComponentCanDeactivate } from './_guard/pending-change.guard';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, ComponentCanDeactivate {
	isPasswordHidden: boolean = true;
	isLoading: boolean = false;
	user: IUser;

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
		email: new FormControl(
			'',
			[Validators.required, Validators.email],
			[this.emailValidator()]
		),
		password: new FormControl('', [
			Validators.required,
			passwordValidation,
			Validators.maxLength(25)
		])
	});

	constructor(
		public dialog: MatDialog,
		private userFirebaseService: UserFirebaseService,
		private currentUserService: CurrentUserService,
		private autorizationService: AuthorizationService,
		private router: Router,
		private snack: SnackBarService
	) {}

	canDeactivate(): Observable<boolean> | boolean {
		return !this.changeProfileForm.dirty;
	}

	ngOnInit(): void {
		// Contain data from currentUser inside FormGroup values
		this.currentUserService.currentUser$
			.pipe(take(1))
			.subscribe((curUser: IUser) => {
				this.user = curUser;
				this.changeProfileForm.patchValue(curUser);
			});
	}

	submitResult() {
		this.isLoading = true;
		// Update data inside firebase
		this.autorizationService
			.updateUser(this.changeProfileForm.value, this.user)
			.then(() => {
				this.isLoading = false;
				this.changeProfileForm.markAsPristine();
				this.dialog
					.open(SubmitDialogComponent)
					.afterClosed()
					.pipe(take(1))
					.subscribe(() => {
						this.router.navigateByUrl('profile/about');
					});
			})
			.catch(error => {
				this.isLoading = false;
				let snackBarRef = this.snack.openSnackBar(error);
				snackBarRef.afterDismissed().subscribe(() => {
					this.ngOnInit();
				});
				this.changeProfileForm.markAsPristine();
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

	emailValidator(): AsyncValidatorFn {
		return (control: AbstractControl): Observable<ValidationErrors | null> => {
			return this.userFirebaseService
				.getUsersWhere('email', '==', control.value)
				.pipe(
					take(1),
					map(res => {
						return res.length ? { emailExists: true } : null;
					})
				);
		};
	}
}
