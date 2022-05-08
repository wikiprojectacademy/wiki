import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserModel } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
	public user: IUserModel;
	public form: FormGroup;
	public roles = [
		{ id: 'superAdmin', name: 'superAdmin' },
		{ id: 'admin', name: 'admin' },
		{ id: 'user', name: 'user' }
	];
	private routeSub: Subscription;
	private isError: boolean;

	constructor(
		private userService: UserService,
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute
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

	editUser() {
		if (this.form.valid) {
			this.userService.editUser(this.form.value);
			this.router.navigate(['/user/list']);
		} else {
			this.isError = true;
			console.log('False');
		}
	}

	ngOnDestroy(): void {
		this.routeSub.unsubscribe();
	}
}
