import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../core/services/user/current-user.service';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'authorization',
	templateUrl: './authorization.component.html',
	styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
	usernameControl: FormControl;

	constructor(private currentUserService: CurrentUserService) {
		this.usernameControl = new FormControl(
			this.currentUserService.getUsername()
		);
	}

	ngOnInit(): void {}
}
