import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export enum ConfirmationSheetChoice {
	CONFIRMED,
	DENIED
}

@Component({
	selector: 'app-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
	public text: string;
	public userChoice: ConfirmationSheetChoice;

	constructor(
		public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: string
	) {}

	ngOnInit(): void {
		this.text = this.data;
	}

	confirmed() {
		this.userChoice = ConfirmationSheetChoice.CONFIRMED;
		this.dismiss();
	}

	denied() {
		this.userChoice = ConfirmationSheetChoice.DENIED;
		this.dismiss();
	}

	dismiss() {
		this.dialogRef.close();
	}
}
