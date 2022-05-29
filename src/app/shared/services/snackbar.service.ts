import { Injectable } from '@angular/core';
import {
	MatSnackBar,
	MatSnackBarRef,
	TextOnlySnackBar
} from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class SnackBarService {
	constructor(private snackBar: MatSnackBar) {}

	openSnackBar(
		message: string,
		action: string = 'Got it',
		duration: number = 50000
	): MatSnackBarRef<TextOnlySnackBar> {
		return this.snackBar.open(message, action, {
			duration
		});
	}
}
