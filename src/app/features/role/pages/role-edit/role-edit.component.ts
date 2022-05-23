import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '@shared/services/snackbar.service';
import { RoleFirebaseService } from '@core/services/firebase/firebase-entities/roleFirebase.service';
import { IRole } from '@core/models/Role';
import { CategoryFirebaseService } from '@core/services/firebase/firebase-entities/categoryFirebase.service';
import { ICategory } from '@core/models/Category';

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
			availableCategoriesToView: []
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
		this.roleFirebaseService.getRole(id).subscribe((role: IRole) => {
			this.role = role;
			this.form.patchValue(this.role);
		});
	}

	editRole(): void {
		if (this.form.valid) {
			if (this.id !== '0') {
				this.roleFirebaseService.editRole(this.id, this.form.value);
				this.router.navigate(['/role']);
			} else {
				this.snackBService.openSnackBar(
					'This Super Admin role cannot edit',
					'',
					5000
				);
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
