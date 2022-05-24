import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICategory as CategoryDB } from '@core/models/Category';
import { ICategoryFull as Category } from '../../models/icategory-full';
import { SnackBarService } from '@shared/services/snackbar.service';
import { CategoryService } from '../../services/categories.service';
import { RolesService } from '../../services/roles.service';
import { IRole as RoleDB } from '@core/models/Role';
import { forkJoin, Observable, tap } from 'rxjs';

@Component({
	selector: 'app-edit-category',
	templateUrl: './edit-category.component.html',
	styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
	form: FormGroup;
	isLoading;
	roles: RoleDB[] = [];
	roles$: Observable<RoleDB[]>;

	category: Category = {
		id: '',
		name: '',
		createdBy: '',
		subCategories: [],
		availableRolesToView: [],
		subCategoriesFull: [],
		rolesFull: []
	};

	get subCategoriesArray() {
		return this.form.get('subCategories') as FormArray;
	}

	get rolesArray() {
		return this.form.get('roles') as FormArray;
	}

	get nameFormControl() {
		return this.form.get('name') as FormControl;
	}

	constructor(
		private route: ActivatedRoute,
		private categoryService: CategoryService,
		private snackbarService: SnackBarService,
		private roleService: RolesService
	) {
		let id = this.route.snapshot.paramMap.get('id');
		if (id !== 'new') {
			this.roles$ = this.roleService.getRolesAll();
			this.roles$.subscribe(rolesFromDB => {
				this.roles = rolesFromDB;
			});

			this.isLoading = true;
			const subscr = this.categoryService.getCategoryById(id).subscribe(cat => {
				this.category = cat;
				this.updateForm();
				this.isLoading = false;
				subscr.unsubscribe();
			});
		} else {
			this.roles$ = this.roleService.getRolesAll();
			this.category.id = 'new';
		}

		// const subscrRoles = this.roleService
		// 	.getRolesAll()
		// 	.subscribe(rolesFromDB => {
		// 		console.log(rolesFromDB);
		// 		this.roles = rolesFromDB;
		// 		subscrRoles.unsubscribe();
		// 	});

		this.form = new FormGroup({
			name: new FormControl(this.category.name, Validators.required),
			subCategories: new FormArray([]),
			roles: new FormArray([])
		});
	}

	// @ViewChild('form') form: NgForm;

	ngOnInit(): void {}

	updateForm(): void {
		this.nameFormControl.patchValue(this.category.name);

		if (this.category.subCategoriesFull) {
			this.category.subCategoriesFull.forEach(subCat => {
				if (subCat) {
					this.subCategoriesArray.push(new FormControl(subCat.name));
				}
			});
		}

		console.log(this.roles);
		this.category.rolesFull.forEach(role => {
			console.log(role);
			const formControl = new FormControl(role);
			// formControl.setValue(role);
			this.rolesArray.push(formControl);
		});
	}

	addSubcategoryContoll() {
		this.subCategoriesArray.push(new FormControl('', Validators.required));
	}

	addRoleContoll() {
		this.rolesArray.push(new FormControl('', Validators.required));
	}

	removeRoleControll(index) {
		this.rolesArray.removeAt(index);
	}

	removeSubcategoryControll(index) {
		this.subCategoriesArray.removeAt(index);
	}

	onSubmit() {
		this.snackbarService.openSnackBar('Sended to console!');
		const result = this.form.value;
		this.category = {
			...this.category,
			name: result.name,
			availableRolesToView: result.roles,
			subCategories: result.subCategories
		};

		if (this.category.id == 'new') {
			this.categoryService.addCategory(this.category);
		} else {
			this.categoryService.editCategory(this.category);
		}
	}
}
