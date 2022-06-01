import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlyCanModifyCategoryGuard } from '@shared/_guards/only-can-modify-category.guard';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';

const routes: Routes = [
	{
		path: '',
<<<<<<< HEAD
		// canActivate: [OnlyLoggedInUserGuard],
		component: CategoriesListComponent
	},
	{
		path: 'edit/:id',
		// canActivate: [OnlyLoggedInUserGuard],
		component: EditCategoryComponent
=======
		component: CategoriesListComponent,
		canActivate: [OnlyCanModifyCategoryGuard]
	},
	{
		path: 'edit/:id',
		component: EditCategoryComponent,
		canActivate: [OnlyCanModifyCategoryGuard]
>>>>>>> ff5a52dd5e7863cd4e1d281ae10ec90aeb729f2b
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CategoriesEditRoutingModule {}
