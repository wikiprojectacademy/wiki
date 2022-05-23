import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SnackBarService } from '@shared/services/snackbar.service';
import { Router } from '@angular/router';
import { RoleFirebaseService } from '@core/services/firebase/firebase-entities/roleFirebase.service';
import { Observable } from 'rxjs';
import { IRole } from '@core/models/Role';

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
		private roleFirebaseService: RoleFirebaseService
	) {}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	ngAfterViewInit() {
		this.roleFirebaseService
			.getRoles()
			/*    .pipe(
      switchMap(roles => {
        console.log(roles);
        const rolesArray$ = [];
        roles.forEach(role => {
          this.roleCategoryFirebaseService.getRoleCategoryEntriesByRoleId(role.id).then((e) => {
            console.log(1111111111111, e);
          });
        });
        return forkJoin(rolesArray$);
      })
    )*/
			.subscribe(roles => {
				this.dataSource = new MatTableDataSource<IRole>(roles);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			});
	}

	getNames(ids: string[]): string {
		return '' + ids;
	}

	announceSortChange(sortState: Sort): void {
		if (sortState.direction) {
			this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this.liveAnnouncer.announce('Sorting cleared');
		}
	}

	onDelete(id: string): void {
		if (id !== '0') {
			this.roleFirebaseService.deleteRole(id);
		} else {
			this.snackBService.openSnackBar(
				'This Super Admin role cannot delete',
				'',
				5000
			);
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
