import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
	constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

	deniedRouting() {
		this.dialogRef.close(false);
	}
	confirmRouting() {
		this.dialogRef.close(true);
	}
}
