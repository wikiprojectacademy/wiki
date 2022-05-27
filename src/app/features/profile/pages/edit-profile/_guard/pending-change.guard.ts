import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

export interface ComponentCanDeactivate {
	canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangeGuard
	implements CanDeactivate<ComponentCanDeactivate>
{
	constructor(private dialog: MatDialog) {}

	canDeactivate(
		component: ComponentCanDeactivate
	): boolean | Observable<boolean> {
		return component.canDeactivate()
			? true
			: this.dialog
					.open(ConfirmationDialogComponent, {
						restoreFocus: false
					})
					.afterClosed();
	}
}
