import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: '/authorization', pathMatch: 'full' },
	{
		path: 'user-list',
		loadChildren: () =>
			import('./features/user-list/user-list.module').then(
				m => m.UserListModule
			)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
