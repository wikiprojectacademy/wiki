import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserModel } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '@shared/services/snackbar.service';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
	public user: IUserModel;
	public form: FormGroup;
	//todo will change after role module added
	public roles = [
		{ id: 'superAdmin', name: 'superAdmin' },
		{ id: 'admin', name: 'admin' },
		{ id: 'user', name: 'user' }
	];
	private routeSub: Subscription;

	constructor(
		private userService: UserService,
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private snackBService: SnackBarService
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
			role: ['']
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

	editUser(): void {
		if (this.form.valid) {
			this.userService.editUser(this.form.value);
			this.router.navigate(['/user/list']);
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
