import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SnackBarService } from '@shared/services/snackbar.service';
import { Router } from '@angular/router';
import { RoleFirebaseService } from '@core/services/firebase/firebase-entities/roleFirebase.service';
import { Observable, take, tap } from 'rxjs';
import { IRole } from '@core/models/Role';
import { RoleCategoryFirebaseService } from '@core/services/firebase/firebase-entities/roleCategoryFirebase.service';
import { CategoryFirebaseService } from '@core/services/firebase/firebase-entities/categoryFirebase.service';
import { IRoleCategoryPair } from '@core/models/RoleCategoryPair';
import { ICategory } from '@core/models/Category';
import { ConfirmationSheetChoice } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from '@core/services/confirmationDialog/confirmationDialog.service';

@Component({
	selector: 'app-user',
	templateUrl: './role-list.component.html',
	styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements AfterViewInit {
	public roles: Observable<IRole[]>;
	public displayedColumns: string[] = [
		'name',
		'modificationCategory',
		'modificationPost',
		'availableCategoryIdsToView',
		'id'
	];
	public dataSource: MatTableDataSource<IRole>;

	constructor(
		private liveAnnouncer: LiveAnnouncer,
		private snackBService: SnackBarService,
		private router: Router,
		private roleFirebaseService: RoleFirebaseService,
		private roleCategoryFirebaseService: RoleCategoryFirebaseService,
		private categoryFirebaseService: CategoryFirebaseService,
		private confirmationDialogService: ConfirmationDialogService
	) {}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	ngAfterViewInit() {
		this.roleFirebaseService
			.getRoles()
			.pipe(
				tap(roles => {
					roles.forEach(role => {
						this.roleCategoryFirebaseService
							.getRoleCategoriesByRoleId(role.id)
							.subscribe((resul: IRoleCategoryPair[]) => {
								let categoriesIds = resul.map(item => item.categoryId);
								if (!!categoriesIds.length) {
									this.categoryFirebaseService
										.getCategoriesByIds(categoriesIds)
										.subscribe((categoriesName: ICategory[]) => {
											role.availableCategoriesToView = categoriesName || [];
										});
								}
							});
					});
				})
			)
			.subscribe(roles => {
				this.dataSource = new MatTableDataSource<IRole>(roles);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			});
	}

	announceSortChange(sortState: Sort): void {
		if (sortState.direction) {
			this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this.liveAnnouncer.announce('Sorting cleared');
		}
	}

	confirmationDelete(role: IRole) {
		this.confirmationDialogService
			.ask(`Are you sure to delete role ${role.name}?`)
			.then(result => {
				if (result === ConfirmationSheetChoice.CONFIRMED) {
					this.onDelete(role);
				}
			});
	}

	onDelete(role: IRole): void {
		if (role.id !== '0') {
			this.roleFirebaseService.deleteRole(role.id).then(() => {
				if (
					role.availableCategoriesToView &&
					role.availableCategoriesToView.length
				) {
					role.availableCategoriesToView.map(item => {
						this.roleCategoryFirebaseService
							.getRoleCategoriesId(role.id, item.id)
							.pipe(take(1))
							.subscribe((res: IRoleCategoryPair[]) => {
								res.map(item => {
									this.roleCategoryFirebaseService.deleteDoc(item.id);
								});
							});
					});
				}
				this.snackBService.openSnackBar(
					`The ${role.name} role has deleted successfully`
				);
			});
		} else {
			this.snackBService.openSnackBar('This Super Admin role cannot delete');
		}
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
		return '';
	}

	getTooltipTextForEdit(element): string {
		if (element.id === '0') {
			return 'Super Admin role cannot edit';
		}
		return '';
	}
}
