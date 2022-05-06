import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization.component';

/*
List here all routes related to authorization module.
Routes for singIn, singUp components
 */

const routes: Routes = [
	{
		path: 'authorization',
		component: AuthorizationComponent
		// children: [
		// 	{ path: 'signIn', component: SignInComponent },
		// 	{
		// 		path: 'signUp',
		// 		component: SingUpComponent
		// 	}
		// ]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthorizationRoutingModule {}