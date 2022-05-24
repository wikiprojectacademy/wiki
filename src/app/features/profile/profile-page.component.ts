import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

@Component({
	selector: 'app-profile-page',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
	constructor(
		// private editProfileComponent: EditProfileComponent,
		public router: Router,
		public dialog: MatDialog
	) {}

	openDialog() {
		console.log(11);
		if (
			true
			// this.editProfileComponent.changeProfileForm.dirty
		) {
			this.dialog.open(ConfirmationDialogComponent);
		} else {
			console.log('navigated');
			this.router.navigateByUrl('/profile/about');
		}
	}
}
