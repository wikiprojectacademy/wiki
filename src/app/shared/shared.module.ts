import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	// Here are must list all pages, that are inside shared folder
	declarations: [],
	imports: [CommonModule],
	// Here are must list all pages, that are inside shared folder, so when you import shared module in some of module,
	// you have access for all shared pages
	exports: []
})
export class SharedModule {}
