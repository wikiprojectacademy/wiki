import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';

/*
List here all routes related to authorization module.
Routes for singIn, singUp components
 */

const routes: Routes = [
	{
		path: '',
		component: UserListComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserListRoutingModule {}
