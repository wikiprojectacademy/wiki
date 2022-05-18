import { Injectable } from '@angular/core';
import { IRoleModel } from '../models/role.model';
import { SnackBarService } from '@shared/services/snackbar.service';

@Injectable({
	providedIn: 'root'
})
export class RoleService {
	// todo will change after Firebase done
	private roles: IRoleModel[] = [
		{
			id: '0',
			name: 'superAdmin',
			hasUsers: true,
			modificationCategory: true,
			modificationPost: true,
			availableCategoryIdsToView: [
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'10'
			]
		},
		{
			id: '1',
			name: 'trueUser',
			hasUsers: true,
			modificationCategory: true,
			modificationPost: true,
			availableCategoryIdsToView: ['1', '2', '3', '4']
		},
		{
			id: '2',
			name: 'angularUser',
			hasUsers: true,
			modificationCategory: true,
			modificationPost: true,
			availableCategoryIdsToView: ['1', '2', '3', '4', '5', '6']
		},
		{
			id: '3',
			name: 'reactUser',
			hasUsers: true,
			modificationCategory: true,
			modificationPost: true,
			availableCategoryIdsToView: ['1', '2', '3', '4', '7', '8']
		},
		{
			id: '4',
			name: 'nodeUser',
			hasUsers: true,
			modificationCategory: true,
			modificationPost: true,
			availableCategoryIdsToView: ['1', '2', '3', '4', '5', '9', '10']
		},
		{
			id: '5',
			name: 'simpleUser',
			hasUsers: true,
			modificationCategory: false,
			modificationPost: false,
			availableCategoryIdsToView: ['1', '2']
		},
		{
			id: '6',
			name: 'deleteUser',
			hasUsers: false,
			modificationCategory: false,
			modificationPost: false,
			availableCategoryIdsToView: ['1', '2']
		}
	];

	constructor(private snackBService: SnackBarService) {}

	getRoles(): IRoleModel[] {
		return this.roles;
	}

	getRolesOption(): { id: string; name: string }[] {
		return this.roles.map(item => ({ id: item.id, name: item.name }));
	}

	getRoleById(id): IRoleModel {
		return this.roles.filter(item => item.id === id)[0];
	}

	addRole(role): void {
		this.roles.push({ ...role, id: (this.roles.length + 1).toString() });
	}

	updateHasUser(id): void {
		this.roles = this.roles.map(item => {
			if (item.id === id) {
				return { ...item, hasUsers: !item.hasUsers };
			}
			return item;
		});
	}

	editRole(role): void {
		if (role.id !== '0') {
			this.roles = this.roles.map(item => {
				if (item.id === role.id) {
					return role;
				}
				return item;
			});
		} else {
			this.snackBService.openSnackBar('This role cannot edit', '', 5000);
		}
	}

	deleteRole(id: string): void {
		if (id !== '0') {
			this.roles = this.roles.filter(function (item) {
				return item.id !== id;
			});
			this.snackBService.openSnackBar('Role deleted', '', 1000);
		} else {
			this.snackBService.openSnackBar('This role cannot delete', '', 1000);
		}
	}
}
