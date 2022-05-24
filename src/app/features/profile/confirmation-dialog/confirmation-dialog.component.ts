import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
	selector: 'app-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
	constructor(
		private router: Router,
		private dialogRef: MatDialogRef<ConfirmationDialogComponent>
	) {}

	confirmRouting() {
		this.dialogRef.close();
		this.router.navigateByUrl('/profile/about');
	}
}
