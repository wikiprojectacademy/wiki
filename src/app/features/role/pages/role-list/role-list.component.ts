import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IRoleModel } from '../../models/role.model';
import { RoleService } from '../../services/role.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SnackBarService } from '@shared/services/snackbar.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
	selector: 'app-user',
	templateUrl: './role-list.component.html',
	styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit, AfterViewInit {
	public roles: IRoleModel[] = [];
	public displayedColumns: string[] = [
		'name',
		'modificationCategory',
		'modificationPost',
		'availableCategoryIdsToView',
		'id'
	];
	public dataSource: MatTableDataSource<IRoleModel>;

	constructor(
		private roleService: RoleService,
		private liveAnnouncer: LiveAnnouncer,
		private snackBService: SnackBarService,
		private router: Router,
		private categoryService: CategoryService
	) {
		this.getRoles();
	}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	ngOnInit(): void {}

	getRoles(): void {
		this.roles = this.roleService.getRoles();
		this.dataSource = new MatTableDataSource<IRoleModel>(this.roles);
	}

	getNames(ids: string[]): string {
		return this.categoryService.getCategoriesById(ids);
	}

	announceSortChange(sortState: Sort): void {
		if (sortState.direction) {
			this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this.liveAnnouncer.announce('Sorting cleared');
		}
	}

	onDelete(id: string): void {
		this.roleService.deleteRole(id);
		this.getRoles();
	}

	onEdit(id: string): void {
		this.router.navigate([`/role/edit/${id}`]);
	}

	getTooltipTextForDelete(element): string {
		if (element.id === '0') {
			return 'Super Admin role cannot delete';
		}
		if (element.hasUsers) {
			return 'This role cannot delete because have users';
		}
	}
	getTooltipTextForEdit(element): string {
		if (element.id === '0') {
			return 'Super Admin role cannot edit';
		}
	}
}
