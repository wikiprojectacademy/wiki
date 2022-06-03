import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory as CategoryDB } from '@core/models/Category';
import { ICategoryFull as Category } from '../../models/icategory-full';
import { SnackBarService } from '@shared/services/snackbar.service';
import { CategoryService } from '../../services/categories.service';
import { RolesService } from '../../services/roles.service';
import { IRole as RoleDB } from '@core/models/Role';
import { combineLatest, forkJoin, Observable, take, tap } from 'rxjs';
import { ISubCategory as SubCategoryDB } from '@core/models/SubCategory';
import { PostFirebaseService } from '@core/services/firebase/firebase-entities/postFirebase.service';

@Component({
	selector: 'app-edit-category',
	templateUrl: './edit-category.component.html',
	styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent {
	form: FormGroup;
	isLoading: boolean = true;

	roles$: Observable<RoleDB[]>;
	roles: RoleDB[];

	category: Category = {
		id: '',
		name: '',
		createdBy: '0',
		subCategories: [],
		availableRolesToView: [],
		subCategoriesFull: [],
		rolesFull: []
		// createdByFull: { firstName: 'NO', lastName: 'DATA' }
	};
	categoryStartState: Category;

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
		private postFbService: PostFirebaseService,
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

	/**
	 * Initialization
	 */

	loadCategoryFromDB(categoryId: string) {
		const category$ = this.categoryService
			.getCategoryById(categoryId)
			.pipe(take(1));
		const posts$ = this.postFbService.getCollection().pipe(take(1));

		combineLatest([category$, posts$]).subscribe(
			([categoryFromDB, postsFromDB]) => {
				this.category = { ...categoryFromDB, postAmout: 0 };
				this.categoryStartState = { ...categoryFromDB };

				postsFromDB.forEach(post => {
					if (post.categoryId == this.category.id) {
						this.category.postAmout++;
					}
				});

				this.updateForm();
				this.isLoading = false;
			}
		);
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

	/**
	 * Main actions
	 */

	addCategory(): void {
		this.categoryService
			.addCategory(this.category)
			.then(() => {
				this.navigateToList();
			})
			.catch(() => this.showError());
	}

	editCategory(): void {
		this.isLoading = true;
		this.categoryService
			.editCategory(this.category, this.categoryStartState)
			.then(() => {
				this.navigateToList();
			});
	}

	deleteCategory() {
		this.isLoading = true;
		// this.snackbarService.openSnackBar('In development', 'Got it', 3000);
		this.categoryService
			.deleteCategory(this.category)
			.then(() => {
				this.router.navigateByUrl('/edit-categories');
			})
			.catch(() => this.showError());
	}

	/**
	 * UI actions
	 */

	showError() {
		this.snackbarService.openSnackBar('Something went wrong...', 'Ok', 10000);
	}

	navigateToList() {
		this.router.navigateByUrl('/edit-categories');
	}

	/**
	 * Form methods
	 */

	isRoleNotSelected(roleId): boolean {
		return this.form.value.roles.includes(roleId);
	}

	fillCategoryFromForm() {
		const formOutput = this.form.value;
		this.fillSubcategories();

		const rolesArray: RoleDB[] = [];
		formOutput.roles.forEach(roleID => {
			rolesArray.push(
				this.roles.filter(role => {
					return role.id == roleID;
				})[0]
			);
		});

		this.category.availableRolesToView = formOutput.roles;
		this.category.rolesFull = rolesArray;
		this.category.name = formOutput.name;
	}

	fillSubcategories() {
		const subCategoriesFromForm = this.form.value.subCategories;
		const subCategoriesDistinctNames = [];
		const subCategoriesArray: SubCategoryDB[] = [];

		subCategoriesFromForm.forEach(subCatName => {
			if (!subCategoriesDistinctNames.includes(subCatName)) {
				subCategoriesDistinctNames.push(subCatName);
			}
		});

		subCategoriesDistinctNames.forEach(subCatName => {
			subCategoriesArray.push({ name: subCatName });
		});

		this.category.subCategoriesFull = subCategoriesArray;
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
