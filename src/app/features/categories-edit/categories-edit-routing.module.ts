import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';

const routes: Routes = [
	{ path: '', component: CategoriesListComponent },
	{ path: 'edit/:id', component: EditCategoryComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CategoriesEditRoutingModule {}
