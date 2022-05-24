import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
	ConfirmationDialogComponent,
	ConfirmationSheetChoice
} from '@shared/components/confirmation-dialog/confirmation-dialog.component';

/**
 * Global service to display a confirmation sheets.
 */
@Injectable({
	providedIn: 'root'
})
export class ConfirmationDialogService {
	constructor(private dialog: MatDialog) {}

	/**
	 * Show a confirmation sheet, with given message.
	 * Return a Promise with the choice of the user.
	 * @param text
	 */
	public ask(text: string): Promise<ConfirmationSheetChoice> {
		return new Promise((resolve, reject) => {
			const dialogRef: MatDialogRef<ConfirmationDialogComponent> =
				this.dialog.open(ConfirmationDialogComponent, {
					data: text,
					restoreFocus: false,
					maxWidth: '400px'
				});

			dialogRef
				.afterClosed()
				.subscribe(() => resolve(dialogRef.componentInstance.userChoice));
		});
	}
}
