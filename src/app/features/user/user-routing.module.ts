import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserAddComponent } from './pages/user-add/user-add.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{ path: '', component: UserListComponent, pathMatch: 'full' },
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
