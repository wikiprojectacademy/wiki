import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IUserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { forkJoin, Observable, switchMap, take, tap } from 'rxjs';
import { IUser } from '@core/models/User';
import { IRole } from '@core/models/Role';

@Component({
	selector: 'app-user',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
	public users: IUserModel[] = [];
	public usersModel: IUser[];
	users$: Observable<IUser[]>;
	roles$: Observable<IRole[]>;
	public displayedColumns: string[] = [
		'firstName',
		'lastName',
		'email',
		'roleId',
		'id'
	];
	public dataSource: MatTableDataSource<IUser>;

	constructor(
		private userService: UserService,
		private liveAnnouncer: LiveAnnouncer
	) {
		this.getUsers();
	}
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	ngAfterViewInit() {
		this.roles$.subscribe((roles: IRole[]) => {
			this.usersModel?.map(user => {
				const roleId = user.roleId;
				const role = roles.find(item => item.id === roleId);
				return (user.roleId = role.name);
			});
			this.dataSource = new MatTableDataSource<IUser>(this.usersModel);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});
	}
	ngOnInit(): void {
		this.getUsers();
	}

	getUsers(): void {
		this.users$ = this.userService.getUsers();
		this.roles$ = this.users$.pipe(
			tap((users: IUser[]) => (this.usersModel = users)),
			switchMap(actualUsers => {
				const rolesArray$: Observable<IRole>[] = [];
				actualUsers.forEach(user => {
					const role$: Observable<IRole> = this.userService.getUserRole(
						user.roleId
					);
					rolesArray$.push(role$.pipe(take(1)));
				});
				return forkJoin(rolesArray$);
			})
		);
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
