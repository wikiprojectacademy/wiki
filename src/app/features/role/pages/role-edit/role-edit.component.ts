import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, take, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '@shared/services/snackbar.service';
import { RoleFirebaseService } from '@core/services/firebase/firebase-entities/roleFirebase.service';
import { IRole } from '@core/models/Role';
import { CategoryFirebaseService } from '@core/services/firebase/firebase-entities/categoryFirebase.service';
import { ICategory } from '@core/models/Category';
import { IRoleCategoryPair } from '@core/models/RoleCategoryPair';
import { RoleCategoryFirebaseService } from '@core/services/firebase/firebase-entities/roleCategoryFirebase.service';

@Component({
	selector: 'app-role-edit',
	templateUrl: './role-edit.component.html',
	styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit, OnDestroy {
	private id: string;
	private routeSub: Subscription;
	public role: IRole;
	public form: FormGroup;
	public categories$: Observable<ICategory[]>;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private snackBService: SnackBarService,
		private categoryFirebaseService: CategoryFirebaseService,
		private roleCategoryFirebaseService: RoleCategoryFirebaseService,
		private roleFirebaseService: RoleFirebaseService
	) {
		this.getCategories();
		this.form = formBuilder.group({
			id: [],
			hasUsers: [],
			name: [
				'',
				[Validators.required, Validators.minLength(2), Validators.maxLength(25)]
			],
			canModifyCategory: [false],
			canModifyPost: [false],
			categories: []
		});
	}

	ngOnInit(): void {
		this.routeSub = this.route.params.subscribe(params => {
			this.id = params['id'];
			this.getRoleById(params['id']);
		});
	}

	getCategories() {
		this.categories$ = this.categoryFirebaseService.getCategories();
	}

	getRoleById(id: string): void {
		this.roleFirebaseService
			.getRole(id)
			.pipe(
				take(1),
				tap(role => {
					this.roleCategoryFirebaseService
						.getRoleCategoriesByRoleId(role.id)
						.pipe(take(1))
						.subscribe((resul: IRoleCategoryPair[]) => {
							let categoriesIds = resul.map(item => item.categoryId);
							if (!!categoriesIds.length) {
								this.categoryFirebaseService
									.getCategoriesByIds(categoriesIds)
									.pipe(take(1))
									.subscribe((categories: ICategory[]) => {
										role.categories = categories.map(item => item.id);
										this.form.patchValue({ categories: role.categories });
									});
							} else {
								role.categories = [];
							}
						});
				})
			)
			.subscribe((role: IRole) => {
				this.role = role;
				this.form.patchValue(this.role);
			});
	}

	get newRole() {
		return {
			name: this.form.value.name,
			canModifyCategory: this.form.value.canModifyCategory,
			canModifyPost: this.form.value.canModifyPost
		};
	}

	get checkChangeInCategories(): boolean {
		return (
			JSON.stringify(this.form.value.categories) !==
			JSON.stringify(this.role.categories)
		);
	}

	editRole(): void {
		if (this.form.valid) {
			if (this.id !== '0') {
				this.roleFirebaseService.editRole(this.id, this.newRole).then(() => {
					if (this.checkChangeInCategories) {
						if (
							this.form.value.categories &&
							this.form.value.categories.length
						) {
							let addedCategories = this.form.value.categories.filter(
								item => !this.role.categories.includes(item)
							);
							addedCategories.forEach(categoryId => {
								this.roleCategoryFirebaseService.addRoleCategoryEntry({
									roleId: this.role.id,
									categoryId
								});
							});
						}
						if (this.role.categories && this.role.categories.length) {
							let deletedCategories = this.role.categories.filter(
								item => !this.form.value.categories.includes(item)
							);
							deletedCategories.forEach(item => {
								this.roleCategoryFirebaseService
									.getRoleCategoriesId(this.role.id, item)
									.pipe(take(1))
									.subscribe((res: IRoleCategoryPair[]) => {
										res.map(item => {
											this.roleCategoryFirebaseService.deleteDoc(item.id);
										});
									});
							});
						}
						this.router.navigate(['/role']);
					}
				});
			} else {
				this.snackBService.openSnackBar('This Super Admin role cannot edit');
			}
		} else {
			this.snackBService.openSnackBar(
				'To edit a user, you must correctly fill in all required fields'
			);
		}
	}

	ngOnDestroy(): void {
		this.routeSub.unsubscribe();
	}
}
