import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OnlyLogOutUserGuard } from '@shared/_guards/only-log-out-user.guard';

/*
List here all routes related to authorization module.
Routes for singIn, singUp components
 */

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [OnlyLogOutUserGuard]
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [OnlyLogOutUserGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthorizationRoutingModule {}
