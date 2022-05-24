import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '@shared/services/snackbar.service';
import { IRole } from '@core/models/Role';
import { RoleFirebaseService } from '@core/services/firebase/firebase-entities/roleFirebase.service';
import { UserFirebaseService } from '@core/services/firebase/firebase-entities/userFirebase.service';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
	private id: string;
	private routeSub: Subscription;
	public user;
	public form: FormGroup;
	public roles$: Observable<IRole[]>;

	constructor(
		private userFirebaseService: UserFirebaseService,
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private snackBService: SnackBarService,
		private roleFirebaseService: RoleFirebaseService
	) {
		this.form = formBuilder.group({
			id: [],
			firstName: [
				'',
				[Validators.required, Validators.minLength(2), Validators.maxLength(25)]
			],
			lastName: [
				'',
				[Validators.required, Validators.minLength(2), Validators.maxLength(25)]
			],
			email: ['', [Validators.required, Validators.email]],
			roleId: ['']
		});
	}

	ngOnInit(): void {
		this.roles$ = this.roleFirebaseService.getRoles();
		this.routeSub = this.route.params.subscribe(params => {
			this.id = params['id'];
			this.getUserById(params['id']);
		});
	}

	getUserById(id: string): void {
		this.userFirebaseService
			.getUserData(id)
			.pipe(take(1))
			.subscribe(user => {
				this.user = user;
				this.form.patchValue({ id, ...user });
			});
	}

	updateRole(roleId: string, hasUsers): void {
		this.roleFirebaseService.editRole(roleId, { hasUsers });
	}

	editUser(): void {
		console.count('count');
		if (this.form.valid) {
			if (this.id !== '0') {
				this.userFirebaseService.updateUser(this.id, this.form.value).then(
					() => {
						if (this.form.value.roleId !== this.user.roleId) {
							this.updateRole(this.form.value.roleId, true);
							this.userFirebaseService
								.getUsersWithRoleId(this.user.roleId)
								.pipe(take(1))
								.subscribe(users => {
									console.log(users);
									if (!users.length) {
										this.updateRole(this.user.roleId, false);
									}
								});
						}
						this.router.navigate(['/user']);
					},
					error => {
						this.snackBService.openSnackBar(
							'Failure to create a new user. Reason: ' + error
						);
					}
				);
			} else {
				this.snackBService.openSnackBar(
					'This Super Admin account cannot edit',
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
