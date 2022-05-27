import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadSpinnerComponent } from './components/load-spinner/load-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UpdateDataSpinnerComponent } from './components/update-spinner/update-data-spinner.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	// Here are must list all components, that are inside shared folder
	declarations: [
		LoadSpinnerComponent,
		UpdateDataSpinnerComponent,
		ConfirmationDialogComponent
	],
	imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule],
	// Here are must list all components, that are inside shared folder, so when you import shared module in some of module,
	// you have access for all shared components
	exports: [LoadSpinnerComponent, UpdateDataSpinnerComponent]
})
export class SharedModule {}
