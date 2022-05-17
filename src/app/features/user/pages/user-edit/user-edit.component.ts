import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserModel } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '@shared/services/snackbar.service';
import { RoleService } from '../../../role/services/role.service';

@Component({
	selector: 'app-role-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
	public user: IUserModel;
	public form: FormGroup;
	public roles = [];
	private routeSub: Subscription;

	constructor(
		private userService: UserService,
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private snackBService: SnackBarService,
		private roleService: RoleService
	) {
		this.getRoles();
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
		this.routeSub = this.route.params.subscribe(params => {
			this.getUserById(params['id']);
		});
	}

	getUserById(id: string): void {
		this.user = this.userService.getUserById(id);
		this.form.patchValue(this.user);
	}

	getRoles(): void {
		this.roles = this.roleService.getRolesOption();
	}

	editUser(): void {
		if (this.form.valid) {
			this.userService.editUser(this.form.value);
			this.router.navigate(['/user']);
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
