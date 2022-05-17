import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '@core/models/Category';
import { CategoryService } from '../../services/categories.service';

@Component({
	selector: 'app-edit-category',
	templateUrl: './edit-category.component.html',
	styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
	// isCreateMode = false;
	form: FormGroup;

	category: ICategory = {
		id: 'new',
		name: '',
		createdBy: '',
		subCategories: [],
		availableRolesToView: []
	};

	//TO DO
	roles = [
		{ id: '315135', type: 'admin' },
		{ id: '2222222', type: 'user' },
		{ id: '333333', type: 'guest' }
	];

	get subCategoriesArray() {
		return this.form.get('subCategories') as FormArray;
	}

	get rolesArray() {
		return this.form.get('roles') as FormArray;
	}

	constructor(
		private route: ActivatedRoute,
		private categoryService: CategoryService
	) {
		let id = this.route.snapshot.paramMap.get('id');
		if (id !== 'new') {
			this.category = this.categoryService.getCategoryById(id);
		}

		this.form = new FormGroup({
			name: new FormControl(this.category.name),
			subCategories: new FormArray([]),
			roles: new FormArray([])
		});

		if (this.category.availableRolesToView.length) {
			this.category.availableRolesToView.map(role =>
				this.rolesArray.push(new FormControl(role.type))
			);
		}

		if (this.category.subCategories.length) {
			this.category.subCategories.map(sub =>
				this.subCategoriesArray.push(new FormControl(sub.name))
			);
		}
	}

	// @ViewChild('form') form: NgForm;

	ngOnInit(): void {}

	addSubcategoryContoll() {
		this.subCategoriesArray.push(new FormControl(''));
	}

	addRoleContoll() {
		this.rolesArray.push(new FormControl(''));
	}

	removeRoleControll(index) {
		this.rolesArray.removeAt(index);
	}

	removeSubcategoryControll(index) {
		this.subCategoriesArray.removeAt(index);
	}

	onSubmit() {
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
