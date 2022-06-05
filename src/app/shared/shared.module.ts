import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadSpinnerComponent } from './components/load-spinner/load-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UpdateDataSpinnerComponent } from './components/update-spinner/update-data-spinner.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { ArrayByKeyPipe } from './pipes/array-by-key.pipe';
import { StripeLoaderComponent } from './components/stripe-loader/stripe-loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	// Here are must list all components, that are inside shared folder
	declarations: [
		LoadSpinnerComponent,
		UpdateDataSpinnerComponent,
		ConfirmationDialogComponent,
		ArrayByKeyPipe,
		StripeLoaderComponent,
		PageNotFoundComponent
	],
	imports: [
		CommonModule,
		MatProgressSpinnerModule,
		MatButtonModule,
		MatIconModule,
		RouterModule
	],
	// Here are must list all components, that are inside shared folder, so when you import shared module in some of module,
	// you have access for all shared components
	exports: [
		LoadSpinnerComponent,
		UpdateDataSpinnerComponent,
		ArrayByKeyPipe,
		StripeLoaderComponent
	]
})
export class SharedModule {}
