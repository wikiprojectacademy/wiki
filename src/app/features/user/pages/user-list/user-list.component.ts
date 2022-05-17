import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IUserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SnackBarService } from '@shared/services/snackbar.service';
import { RoleService } from '../../../role/services/role.service';

@Component({
	selector: 'app-user',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
	public users: IUserModel[] = [];
	public displayedColumns: string[] = [
		'firstName',
		'lastName',
		'email',
		'roleId',
		'id'
	];
	public dataSource: MatTableDataSource<IUserModel>;

	constructor(
		private userService: UserService,
		private liveAnnouncer: LiveAnnouncer,
		private snackBService: SnackBarService,
		private roleService: RoleService
	) {
		this.getUsers();
	}
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	ngOnInit(): void {}

	getUsers(): void {
		this.users = this.userService.getUsers();
		this.dataSource = new MatTableDataSource<IUserModel>(this.users);
	}

	getRoleName(id: string): string {
		return this.roleService.getRoleById(id).name;
	}

	announceSortChange(sortState: Sort): void {
		if (sortState.direction) {
			this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this.liveAnnouncer.announce('Sorting cleared');
		}
	}

	onDelete(id: string): void {
		this.userService.deleteUser(id);
		this.getUsers();
	}
}
