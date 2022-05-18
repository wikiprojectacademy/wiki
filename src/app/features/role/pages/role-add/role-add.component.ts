import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { SnackBarService } from '@shared/services/snackbar.service';
import { CategoryService } from '../../services/category.service';

@Component({
	selector: 'app-role-add',
	templateUrl: './role-add.component.html',
	styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent {
	//todo will change after added category module
	public categories: any[] = [];
	public form: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private roleService: RoleService,
		private router: Router,
		private snackBService: SnackBarService,
		private categoryService: CategoryService
	) {
		this.getCategories();
		this.form = formBuilder.group({
			name: [
				'',
				[Validators.required, Validators.minLength(2), Validators.maxLength(25)]
			],
			modificationCategory: [false],
			modificationPost: [false],
			availableCategoryIdsToView: []
		});
	}

	getCategories(): void {
		this.categories = this.categoryService.getCategories();
	}

	addRole(): void {
		if (this.form.valid) {
			this.roleService.addRole(this.form.value);
			this.router.navigate(['/role']);
		} else {
			this.snackBService.openSnackBar(
				'To create a user, you must correctly fill in all required fields'
			);
		}
	}
}
