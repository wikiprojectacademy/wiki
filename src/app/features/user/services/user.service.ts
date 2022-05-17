import { Injectable } from '@angular/core';
import { IUserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { IUser } from '@core/models/User';
import { UserFirebaseService } from '@core/services/firebase/firebase-entities/userFirebase.service';
import { IRole } from '@core/models/Role';
import { RoleFirebaseService } from '@core/services/firebase/firebase-entities/roleFirebase.service';
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
		private userFirebaseService: UserFirebaseService,
		private roleFirebaseService: RoleFirebaseService,
    private snackBService: SnackBarService,
    private roleService: RoleService
	) {}

	getUsers(): Observable<IUser[]> {
		return this.userFirebaseService.getUsers$();
	}

	getUserById(id: string): Observable<IUser> {
		return this.userFirebaseService.getUserData(id);
	}

	getUserRole(roleId: string): Observable<IRole> {
		return this.roleFirebaseService.getRole(roleId);
	}

	addUser(user): void {
		this.users.push({ ...user, id: (this.users.length + 1).toString() });
		this.roleService.updateHasUser(user.roleId);
	}

	editUser(user): void {
		if (user.id !== '0') {
      const { id, ...withoutId } = user;
      this.userFirebaseService.updateUser(user.id, withoutId);
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
