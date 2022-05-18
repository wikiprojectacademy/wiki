import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { IRoleModel } from '../../models/role.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '@shared/services/snackbar.service';
import { CategoryService } from '../../services/category.service';

@Component({
	selector: 'app-role-edit',
	templateUrl: './role-edit.component.html',
	styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit, OnDestroy {
	public role: IRoleModel;
	public form: FormGroup;
	//todo will change after role module added
	private routeSub: Subscription;
	public categories: any[] = [];

	constructor(
		private roleService: RoleService,
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private snackBService: SnackBarService,
		private categoryService: CategoryService
	) {
		this.getCategories();
		this.form = formBuilder.group({
			id: [],
			hasUsers: [],
			name: [
				'',
				[Validators.required, Validators.minLength(2), Validators.maxLength(25)]
			],
			modificationCategory: [false],
			modificationPost: [false],
			availableCategoryIdsToView: []
		});
	}

	ngOnInit(): void {
		this.routeSub = this.route.params.subscribe(params => {
			this.getRoleById(params['id']);
		});
	}

	getCategories(): void {
		this.categories = this.categoryService.getCategories();
	}

	getRoleById(id: string): void {
		this.role = this.roleService.getRoleById(id);
		this.form.patchValue(this.role);
	}

	editRole(): void {
		if (this.form.valid) {
			this.roleService.editRole(this.form.value);
			this.router.navigate(['/role']);
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
