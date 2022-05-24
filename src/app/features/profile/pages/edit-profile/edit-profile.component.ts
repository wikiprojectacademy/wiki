import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from '@core/models/User';
import { passwordValidation } from '@shared/validators/validations';
import { MatDialog } from '@angular/material/dialog';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { filter, first, take } from 'rxjs';
import { AuthorizationService } from 'src/app/features/authorization/services/authorization.service';
import {
	NavigationEnd,
	Router,
	Event,
	NavigationStart,
	ActivationStart
} from '@angular/router';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
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
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [
			Validators.required,
			passwordValidation,
			Validators.maxLength(25)
		])
	});

	constructor(
		public dialog: MatDialog,
		private currentUserService: CurrentUserService,
		private autorizationService: AuthorizationService,
		private router: Router
	) {
		// router.events.subscribe(() => {
		// 	if (this.changeProfileForm.dirty) {
		// 		this.dialog.open(SubmitDialogComponent);
		// 		console.log(111);
		// 	}
		// });
		// maybe i can do that with canDeactivate
		// router.events.subscribe((event: Event) => {
		// 	if (this.changeProfileForm.dirty && event instanceof ActivationStart) {
		// 		this.dialog.open(SubmitDialogComponent);
		// 		console.log(111);
		// 	}
		// });
		// router.events.filter((event) => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
		// 	if (this.changeProfileForm.dirty) {
		// 		this.dialog.open(SubmitDialogComponent);
		// 		console.log(111);
		// 	}
		// });
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

	ngOnDestroy() {
		this.changeProfileForm.markAsPristine();
	}
}
