import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlySuperAdminRoleGuard } from '@shared/_guards/only-super-admin-role.guard';
import { OnlyLoggedInUserGuard } from '@shared/_guards/only-logged-in-user.guard';

import { RoleListComponent } from './pages/role-list/role-list.component';
import { RoleAddComponent } from './pages/role-add/role-add.component';
import { RoleEditComponent } from './pages/role-edit/role-edit.component';

const routes: Routes = [
	{
		path: '',
		// canActivate: [OnlyLoggedInUserGuard, OnlySuperAdminRoleGuard],
		children: [
			{ path: '', component: RoleListComponent, pathMatch: 'full' },
			{ path: 'add', component: RoleAddComponent },
			{ path: 'edit/:id', component: RoleEditComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RoleRoutingModule {}
