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
		private categoryFirebaseService: CategoryFirebaseService
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
							.pipe(take(1))
							.subscribe((resul: IRoleCategoryPair[]) => {
								let categoriesIds = resul.map(item => item.categoryId);
								if (!!categoriesIds.length) {
									this.categoryFirebaseService
										.getCategoriesByIds(categoriesIds)
										.pipe(take(1))
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

	onDelete(role: IRole): void {
		if (role.id !== '0') {
			this.roleFirebaseService.deleteRole(role.id);
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
