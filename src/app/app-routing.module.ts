import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './features/main/main.component';
// import { ProfileGuard } from './features/profile/service/profile.guard';

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
		path: 'profile',
		// canActivateChild: [ProfileGuard],
		loadChildren: () =>
			import('./features/profile/profile-page.module').then(
				m => m.ProfileModule
			)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
