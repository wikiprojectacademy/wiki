import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlyLoggedInUserGuard } from '@shared/_guards/only-logged-in-user.guard';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';

const routes: Routes = [
	{
		path: '',
		// canActivate: [OnlyLoggedInUserGuard],
		component: CategoriesListComponent
	},
	{
		path: 'edit/:id',
		// canActivate: [OnlyLoggedInUserGuard],
		component: EditCategoryComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CategoriesEditRoutingModule {}
