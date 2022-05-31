import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { forkJoin, Observable, switchMap, take, tap } from 'rxjs';
import { IUser } from '@core/models/User';
import { IRole } from '@core/models/Role';
import { UserFirebaseService } from '@core/services/firebase/firebase-entities/userFirebase.service';
import { RoleFirebaseService } from '@core/services/firebase/firebase-entities/roleFirebase.service';
import { SnackBarService } from '@shared/services/snackbar.service';
import { ConfirmationSheetChoice } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from '@core/services/confirmationDialog/confirmationDialog.service';

@Component({
	selector: 'app-user',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
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
		private confirmationDialogService: ConfirmationDialogService,
		private userFirebaseService: UserFirebaseService,
		private roleFirebaseService: RoleFirebaseService,
		private snackBService: SnackBarService,
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
				return (user.roleName = role.name);
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
		this.users$ = this.userFirebaseService.getUsers$();
		this.roles$ = this.users$.pipe(
			tap((users: IUser[]) => (this.usersModel = users)),
			switchMap(actualUsers => {
				const rolesArray$: Observable<IRole>[] = [];
				actualUsers.forEach(user => {
					const role$: Observable<IRole> = this.roleFirebaseService.getRole(
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

	confirmationDelete(user: IUser) {
		this.confirmationDialogService
			.ask(`Are you sure to delete user ${user.firstName} ${user.lastName}?`)
			.then(result => {
				if (result === ConfirmationSheetChoice.CONFIRMED) {
					this.onDelete(user);
				}
			});
	}

	onDelete(user: IUser): void {
		if (!user.isAdmin) {
			this.userFirebaseService.deleteUser(user.id).then(
				() => {
					this.snackBService.openSnackBar(
						`The ${user.firstName} ${user.lastName} user has deleted successfully`
					);
					this.userFirebaseService
						.getUsersWithRoleId(user.roleId)
						.pipe(take(1))
						.subscribe((users: []) => {
							if (!users.length) {
								this.roleFirebaseService.editRole(user.roleId, {
									hasUsers: false
								});
							}
						});
				},
				error => {
					this.snackBService.openSnackBar(
						'User account has not been deleted. Reason: ' + error
					);
				}
			);
		} else {
			this.snackBService.openSnackBar('This Super Admin account cannot delete');
		}
	}
}
