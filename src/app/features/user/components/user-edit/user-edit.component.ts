import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserModel } from '../../models/user.model';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
	public users: IUserModel[] = [];
	public id: string = '2';
	constructor(private userService: UserService) {
		this.userService.getUsers();
		this.getUserById(this.id);
	}

	getUserById(id: string): any {
		this.users = this.users.filter(function (item) {
			return item.id === id;
		});
	}

	ngOnInit() {}
}
