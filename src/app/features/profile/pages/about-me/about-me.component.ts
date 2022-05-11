import { Component, OnInit } from '@angular/core';

import { IRole } from '@core/models/Role';
import { IUser } from '@core/models/User';

@Component({
	selector: 'app-about-me',
	templateUrl: './about-me.component.html',
	styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
	usser: IUser = {
		id: 2,
		firstName: 'Ivan',
		lastName: 'Ivanov',
		email: 'ivanivanov@gmail.com',
		password: 'rgfhfgh32',
		role: {
			id: '1',
			type: 'guest',
			availableCategoriesToView: [],
			permissions: []
		}
	};

	constructor() {}

	ngOnInit(): void {}
}
