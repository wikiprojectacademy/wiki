import { Injectable } from '@angular/core';
import { IUserModel } from '../models/user.model';
import { SnackBarService } from '@shared/services/snackbar.service';
import { RoleService } from '../../role/services/role.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	//todo will change after Firebase done
	private users: IUserModel[] = [
		{
			id: '0',
			firstName: 'Super',
			lastName: 'Admin',
			email: 'superadmin@mail.com',
			password: '123',
			roleId: '0'
		},
		{
			id: '2',
			firstName: 'Den',
			lastName: 'White',
			email: 'denwhite@mail.com',
			password: '1234',
			roleId: '1'
		},
		{
			id: '3',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			roleId: '2'
		},
		{
			id: '4',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			roleId: '3'
		},
		{
			id: '5',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			roleId: '4'
		},
		{
			id: '6',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			roleId: '1'
		},
		{
			id: '7',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			roleId: '2'
		},
		{
			id: '8',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			roleId: '3'
		},
		{
			id: '9',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			roleId: '4'
		},
		{
			id: '10',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			roleId: '1'
		},
		{
			id: '11',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			roleId: '2'
		},
		{
			id: '12',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			roleId: '3'
		},
		{
			id: '13',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			roleId: '4'
		},
		{
			id: '14',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			roleId: '1'
		},
		{
			id: '15',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			roleId: '2'
		}
	];

	constructor(
		private snackBService: SnackBarService,
		private roleService: RoleService
	) {}

	getUsers(): IUserModel[] {
		return this.users;
	}

	getUserById(id): IUserModel {
		return this.users.filter(item => item.id === id)[0];
	}

	addUser(user): void {
		this.users.push({ ...user, id: (this.users.length + 1).toString() });
		this.roleService.updateHasUser(user.roleId);
	}

	editUser(user): void {
		if (user.id !== '0') {
			this.users = this.users.map(item => {
				if (item.id === user.id) {
					return { ...item, ...user };
				}
				return item;
			});
			let roleId = user.roleId;
			let hasUser = this.users.filter(function (item) {
				return item.roleId === roleId;
			});
			if (!hasUser.length) {
				this.roleService.updateHasUser(roleId);
			}
		} else {
			this.snackBService.openSnackBar(
				'This Super Admin account cannot edit',
				'',
				5000
			);
		}
	}

	deleteUser(id: string): void {
		if (id !== '0') {
			let roleId = this.getUserById(id).roleId;
			this.users = this.users.filter(function (item) {
				return item.id !== id;
			});
			let hasUser = this.users.filter(function (item) {
				return item.roleId === roleId;
			});
			if (!hasUser.length) {
				this.roleService.updateHasUser(roleId);
			}
			this.snackBService.openSnackBar('User account deleted', '', 1000);
		} else {
			this.snackBService.openSnackBar(
				'This Super Admin account cannot delete',
				'',
				5000
			);
		}
	}
}
