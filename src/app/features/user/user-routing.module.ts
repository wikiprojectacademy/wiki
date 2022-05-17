import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserGuard } from './services/user.guard';

const routes: Routes = [
	{
		path: '',
		canActivate: [UserGuard],
		children: [
			{ path: 'list', component: UserListComponent },
			{ path: 'add', component: UserAddComponent },
			{ path: 'edit/:id', component: UserEditComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserRoutingModule {}
