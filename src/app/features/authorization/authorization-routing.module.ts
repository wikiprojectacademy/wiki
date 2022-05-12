import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { canActivate } from '@angular/fire/compat/auth-guard';

/*
List here all routes related to authorization module.
Routes for singIn, singUp components
 */
const redirectLoggedInToMain = () => redirectLoggedInTo(['main']);

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'login',
				component: LoginComponent,
				...canActivate(redirectLoggedInToMain)
			},
			{
				path: 'register',
				component: RegisterComponent,
				...canActivate(redirectLoggedInToMain)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthorizationRoutingModule {}
