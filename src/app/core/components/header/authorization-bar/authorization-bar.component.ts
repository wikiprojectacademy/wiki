import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ConfirmationSheetChoice } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from '@core/services/confirmationDialog/confirmationDialog.service';

@Component({
	selector: 'app-authorization-bar',
	templateUrl: './authorization-bar.component.html',
	styleUrls: ['./authorization-bar.component.scss']
})
export class AuthorizationBarComponent implements OnInit {
	constructor(
		private afAuth: AngularFireAuth,
		private routes: Router,
		private confirmationDialogService: ConfirmationDialogService
	) {}

	@Input() isLoggedIn: boolean;

	ngOnInit(): void {}

	logout() {
		this.confirmationDialogService
			.ask('Are you sure to logout?')
			.then(result => {
				if (result === ConfirmationSheetChoice.CONFIRMED) {
					this.afAuth.signOut();
					this.routes.navigateByUrl('/main');
				} else {
					// do what you need;
				}
			});
	}
}
