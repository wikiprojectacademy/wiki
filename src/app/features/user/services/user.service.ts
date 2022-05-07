import { Injectable } from '@angular/core';
import { IUserModel } from '../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private users: IUserModel[] = [
		{
			id: '1',
			firstName: 'Anna',
			lastName: 'Block',
			email: 'annablock@mail.com',
			password: '123',
			role: 'superAdmin'
		},
		{
			id: '2',
			firstName: 'Den',
			lastName: 'White',
			email: 'denwhite@mail.com',
			password: '1234',
			role: 'admin'
		},
		{
			id: '3',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			role: 'user'
		},
		{
			id: '4',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			role: 'user'
		},
		{
			id: '5',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			role: 'user'
		},
		{
			id: '6',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			role: 'user'
		},
		{
			id: '7',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			role: 'user'
		},
		{
			id: '8',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			role: 'user'
		},
		{
			id: '9',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			role: 'user'
		},
		{
			id: '10',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			role: 'user'
		},
		{
			id: '11',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			role: 'user'
		},
		{
			id: '12',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			role: 'user'
		},
		{
			id: '13',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			role: 'user'
		},
		{
			id: '14',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			role: 'user'
		},
		{
			id: '15',
			firstName: 'Robert',
			lastName: 'King',
			email: 'robertking@mail.com',
			password: '12345',
			role: 'user'
		}
	];

	constructor() {}

	getUsers(): IUserModel[] {
		return this.users;
	}

	addUser(user): void {
		this.users.push({ ...user, id: this.users.length + 1 });
	}

	deleteUser(id: string): void {
		this.users = this.users.filter(function (item) {
			return item.id !== id;
		});
	}
}
