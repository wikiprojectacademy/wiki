import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './features/main/main.component';

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
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
