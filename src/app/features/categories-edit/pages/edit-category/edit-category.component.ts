import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory as CategoryDB } from '@core/models/Category';
import { ICategoryFull as Category } from '../../models/icategory-full';
import { SnackBarService } from '@shared/services/snackbar.service';
import { CategoryService } from '../../services/categories.service';
import { RolesService } from '../../services/roles.service';
import { IRole as RoleDB } from '@core/models/Role';
import { forkJoin, Observable, tap } from 'rxjs';
import { ISubCategory as SubCategoryDB } from '@core/models/SubCategory';

@Component({
	selector: 'app-edit-category',
	templateUrl: './edit-category.component.html',
	styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent {
	form: FormGroup;
	isLoading: boolean;
	roles$: Observable<RoleDB[]>;
	roles: RoleDB[];
	category: Category = {
		id: '',
		name: '',
		// createdBy: '0',
		// uncoment in future
		createdBy: '2',
		subCategories: [],
		availableRolesToView: [],
		subCategoriesFull: [],
		rolesFull: [],
		createdByFull: { firstName: 'NO', lastName: 'DATA' }
	};
	categoryStartState: Category;
	// categorySnapshot: Category;
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
		private roleService: RolesService,
		private router: Router
	) {
		let id = this.route.snapshot.paramMap.get('id');
		this.roles$ = this.roleService.getRolesAll();
		this.roles$.subscribe(roles => {
			this.roles = roles;
		});

		if (id !== 'new') {
			this.loadCategoryFromDB(id);
		} else {
			this.category.id = 'new';
		}

		this.initForm();
	}

	onSubmit() {
		if (this.form.valid) {
			this.isLoading = true;
			this.fillCategoryFromForm();

			if (this.category.id == 'new') {
				this.addCategory();
			} else {
				this.editCategory();
			}
		} else {
			this.snackbarService.openSnackBar(
				'Fill all required fields',
				'Got it',
				3000
			);
		}
	}

	loadCategoryFromDB(categoryId: string) {
		this.isLoading = true;
		const subscr = this.categoryService
			.getCategoryById(categoryId)
			.subscribe(cat => {
				// console.log(cat);
				this.category = cat;
				this.categoryStartState = { ...this.category };
				// console.log(this.categoryStartState);

				this.updateForm();
				this.isLoading = false;
				subscr.unsubscribe();
			});
	}

	initForm() {
		this.form = new FormGroup({
			name: new FormControl(this.category.name, Validators.required),
			subCategories: new FormArray([]),
			roles: new FormArray([])
		});
	}

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
			const formControl = new FormControl(role.id);
			this.rolesArray.push(formControl);
		});
	}

	editCategory(): void {
		this.snackbarService.openSnackBar('In Development', 'OK', 3000);
		this.isLoading = false;
		this.categoryService.editCategory(this.category, this.categoryStartState);
	}

	addCategory(): void {
		this.categoryService.addCategory(this.category).then(() => {
			this.navigateToList();
		});
	}

	navigateToList() {
		this.router.navigateByUrl('/edit-categories');
	}

	deleteCategory() {
		this.isLoading = true;
		// this.snackbarService.openSnackBar('In development', 'Got it', 3000);
		this.categoryService
			.deleteCategory(this.category)
			.then(() => {
				this.router.navigateByUrl('/edit-categories');
			})
			.catch(reason => {
				console.log(reason);
			});
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
		const rolesArray: RoleDB[] = [];
		formOutput.roles.forEach(roleID => {
			rolesArray.push(
				this.roles.filter(role => {
					return role.id == roleID;
				})[0]
			);
		});

		this.category.subCategoriesFull = subCategoriesArray;
		this.category.availableRolesToView = formOutput.roles;
		this.category.rolesFull = rolesArray;
		this.category.name = formOutput.name;
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
}
