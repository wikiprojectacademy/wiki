import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './features/main/main.component';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
	{ path: 'main', component: MainComponent },
	{ path: '', redirectTo: '/main', pathMatch: 'full' },
	{
		path: 'authorization',
		loadChildren: () =>
			import('./features/authorization/authorization.module').then(
				m => m.AuthorizationModule
			)
	},
	{
		path: 'user',
		loadChildren: () =>
			import('./features/user/user.module').then(m => m.UserModule)
	},
	{
		path: 'role',
		loadChildren: () =>
			import('./features/role/role.module').then(m => m.RoleModule)
	},
	{
		path: 'profile',
		loadChildren: () =>
			import('./features/profile/profile-page.module').then(
				m => m.ProfileModule
			)
	},
	{
		path: 'edit-categories',
		loadChildren: () =>
			import('./features/categories-edit/categories-edit.module').then(
				m => m.CategoriesEditModule
			)
	},
	{
		path: 'post',
		loadChildren: () =>
			import('./features/post/post.module').then(m => m.PostModule)
	},
	{
		path: 'not-found',
		component: PageNotFoundComponent
	},
	{
		path: '**',
		redirectTo: 'not-found'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
