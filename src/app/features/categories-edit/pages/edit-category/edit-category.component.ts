import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICategory as CategoryDB } from '@core/models/Category';
import { ICategoryFull as Category } from '../../models/icategory-full';
import { SnackBarService } from '@shared/services/snackbar.service';
import { CategoryService } from '../../services/categories.service';
import { RolesService } from '../../services/roles.service';
import { IRole as RoleDB } from '@core/models/Role';
import { forkJoin, Observable, tap } from 'rxjs';
import { ISubCategory as SubCategoryDB } from '@core/models/SubCategory';

// interface FormOutput {

// }

@Component({
	selector: 'app-edit-category',
	templateUrl: './edit-category.component.html',
	styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
	form: FormGroup;
	isLoading: boolean;
	// roles: RoleDB[] = [];
	roles$: Observable<RoleDB[]>;
	category: Category = {
		id: '',
		name: '',
		createdBy: '2',
		subCategories: [],
		availableRolesToView: [],
		subCategoriesFull: [],
		rolesFull: []
	};
	// FORMAT FOR DB
	get categoryDB(): CategoryDB {
		return {
			id: this.category.id,
			name: this.category.name,
			createdBy: this.category.createdBy,
			availableRolesToView: this.category.availableRolesToView
		};
	}
	get subCategoriesDB(): SubCategoryDB[] {
		return this.category.subCategoriesFull;
	}
	// FORM FIELDS
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
			// this.roles$.subscribe(rolesFromDB => {
			// 	this.roles = rolesFromDB;
			// });

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

		this.form = new FormGroup({
			name: new FormControl(this.category.name, Validators.required),
			subCategories: new FormArray([]),
			roles: new FormArray([])
		});
	}

	ngOnInit(): void {}

	ngOnDestroy(): void {}

	updateForm(): void {
		this.nameFormControl.patchValue(this.category.name);

		if (this.category.subCategoriesFull) {
			this.category.subCategoriesFull.forEach(subCat => {
				if (subCat) {
					this.subCategoriesArray.push(new FormControl(subCat.name));
				}
			});
		}

		this.category.rolesFull.forEach(role => {
			// console.log(role);
			const formControl = new FormControl(role.id);
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
		if (this.form.valid) {
			this.snackbarService.openSnackBar('Sended to console!', 'OK', 2000);
			const output = this.form.value;
			this.fillCategoryFromForm();

			///
			// console.log('FORM');
			// console.log(output);
			// console.log('CATEGORY:');
			// console.log(this.category);
			// console.log(this.categoryDB);
			// console.log(this.subCategoriesDB);
			///

			if (this.category.id == 'new') {
				this.categoryService.addCategory(this.category);
			} else {
				this.categoryService.editCategory(this.category);
			}
		} else {
			this.snackbarService.openSnackBar(
				'Fill all required fields',
				'Got it',
				3000
			);
		}
	}

	deleteCategory() {
		this.snackbarService.openSnackBar('In development', 'Got it', 3000);
	}

	isRoleNotSelected(roleId): boolean {
		return this.form.value.roles.includes(roleId);
	}

	fillCategoryFromForm() {
		const formOutput = this.form.value;
		const subCategoriesArray: SubCategoryDB[] = [];
		formOutput.subCategories.forEach(subCategoryName => {
			subCategoriesArray.push({ name: subCategoryName });
		});
		this.category.subCategoriesFull = subCategoriesArray;
		this.category.availableRolesToView = formOutput.roles;
	}
}
