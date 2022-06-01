import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlyCanModifyCategoryGuard } from '@shared/_guards/only-can-modify-category.guard';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';

const routes: Routes = [
	{
		path: '',
		component: CategoriesListComponent,
		canActivate: [OnlyCanModifyCategoryGuard]
	},
	{
		path: 'edit/:id',
		component: EditCategoryComponent,
		canActivate: [OnlyCanModifyCategoryGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CategoriesEditRoutingModule {}
