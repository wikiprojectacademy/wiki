import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { RoleRoutingModule } from './role-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RoleAddComponent } from './pages/role-add/role-add.component';
import { RoleEditComponent } from './pages/role-edit/role-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [RoleListComponent, RoleAddComponent, RoleEditComponent],
	imports: [
		CommonModule,
		RoleRoutingModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatIconModule,
		MatButtonModule,
		MatTooltipModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
		MatCheckboxModule,
		SharedModule
	]
})
export class RoleModule {}
