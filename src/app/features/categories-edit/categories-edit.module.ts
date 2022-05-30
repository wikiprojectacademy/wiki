import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesEditRoutingModule } from './categories-edit-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { SubcategoriesNameListerPipe } from './pipes/subcategories-name-lister.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
	declarations: [
		CategoriesListComponent,
		EditCategoryComponent,
		SubcategoriesNameListerPipe,
  LoaderComponent
	],
	imports: [
		CommonModule,
		CategoriesEditRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatRippleModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule
	]
})
export class CategoriesEditModule {}
