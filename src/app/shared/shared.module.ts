import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadSpinnerComponent } from './components/load-spinner/load-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UpdateDataSpinnerComponent } from './components/update-spinner/update-data-spinner.component';

@NgModule({
	// Here are must list all components, that are inside shared folder
	declarations: [LoadSpinnerComponent, UpdateDataSpinnerComponent],
	imports: [CommonModule, MatProgressSpinnerModule],
	// Here are must list all components, that are inside shared folder, so when you import shared module in some of module,
	// you have access for all shared components
	exports: [LoadSpinnerComponent, UpdateDataSpinnerComponent]
})
export class SharedModule {}
