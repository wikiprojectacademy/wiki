import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICategory as CategoryDB } from '@core/models/Category';
import { ICategoryFull as Category } from '../../models/icategory-full';
import { SnackBarService } from '@shared/services/snackbar.service';
import { CategoryService } from '../../services/categories.service';

@Component({
	selector: 'app-edit-category',
	templateUrl: './edit-category.component.html',
	styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
	// isCreateMode = false;
	form: FormGroup;

	category: Category = {
		id: 'new',
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
		private snackbarService: SnackBarService
	) {
		let id = this.route.snapshot.paramMap.get('id');
		if (id !== 'new') {
			this.categoryService.getCategoryById(id).subscribe(cat => {
				this.category = cat;
				this.updateForm();
			});
		}

		this.form = new FormGroup({
			name: new FormControl(this.category.name, Validators.required),
			subCategories: new FormArray([]),
			roles: new FormArray([])
		});

		// if (this.category.availableRolesToView.length) {
		// 	this.category.availableRolesToView.map(role =>
		// 		this.rolesArray.push(new FormControl(role, Validators.required))
		// 	);
		// }

		// if (this.category.subCategoriesFull.length) {
		// 	this.category.subCategoriesFull.map(sub =>
		// 		this.subCategoriesArray.push(
		// 			new FormControl(sub.name, Validators.required)
		// 		)
		// 	);
		// }
	}

	// @ViewChild('form') form: NgForm;

	ngOnInit(): void {}

	updateForm(): void {
		this.nameFormControl.patchValue(this.category.name);
		// this.rolesArray.patchValue(this.category.rolesFull);
		// this.category.rolesFull.forEach(role => {
		// 	this.rolesArray.push(new FormControl(role.name));
		// });
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
