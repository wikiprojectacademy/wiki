import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from '@shared/services/snackbar.service';
import { RoleFirebaseService } from '@core/services/firebase/firebase-entities/roleFirebase.service';
import { Observable } from 'rxjs';
import { ICategory } from '@core/models/Category';
import { CategoryFirebaseService } from '@core/services/firebase/firebase-entities/categoryFirebase.service';
import { RoleCategoryFirebaseService } from '@core/services/firebase/firebase-entities/roleCategoryFirebase.service';

@Component({
	selector: 'app-role-add',
	templateUrl: './role-add.component.html',
	styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent {
	public categories$: Observable<ICategory[]>;
	public form: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private snackBService: SnackBarService,
		private categoryFirebaseService: CategoryFirebaseService,
		private roleFirebaseService: RoleFirebaseService,
		private roleCategoryFirebaseService: RoleCategoryFirebaseService
	) {
		this.getCategories();
		this.form = formBuilder.group({
			name: [
				'',
				[Validators.required, Validators.minLength(2), Validators.maxLength(25)]
			],
			hasUsers: [false],
			canModifyCategory: [false],
			canModifyPost: [false],
			availableCategoriesToView: [[]]
		});
	}

	getCategories() {
		this.categories$ = this.categoryFirebaseService.getCategories();
	}

	get newRole() {
		return {
			name: this.form.value.name,
			canModifyCategory: this.form.value.canModifyCategory,
			canModifyPost: this.form.value.canModifyPost
		};
	}

	addRole(): void {
		if (this.form.valid) {
			this.roleFirebaseService.addRole(this.newRole).then(
				roleId => {
					if (
						this.form.value.availableCategoriesToView &&
						this.form.value.availableCategoriesToView.length
					) {
						this.form.value.availableCategoriesToView.map(categoryId => {
							this.roleCategoryFirebaseService.addRoleCategoryEntry({
								roleId,
								categoryId
							});
						});
					}
					this.router.navigate(['/role']);
				},
				error => {
					this.snackBService.openSnackBar(
						'Failure to add role. Reason: ' + error
					);
				}
			);
		} else {
			this.snackBService.openSnackBar(
				'To create a role, you must correctly fill in all required fields'
			);
		}
	}
}
