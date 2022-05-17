import { Component, OnInit } from '@angular/core';
import { IUser } from '@core/models/User';

import { DataService } from '../../service/data.service';

@Component({
	selector: 'app-about-me',
	templateUrl: './about-me.component.html',
	styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
	user: IUser;
	// user: IUser = {
	// 	id: '3',
	// 	firstName: 'Ivan',
	// 	lastName: 'Ivanov',
	// 	email: 'ivanivanov@gmail.com',
	// 	password: 'rgfhfgh32',
	// 	roleId: '1'
	// };


	constructor(private dataService: DataService) {}

	// logData() {
	// 	console.log(this.user);
	// }
	ngOnInit(): void {
		this.dataService
			.getUser('d5lRYhxnFibepXPUlCEp')
			.subscribe((data: IUser) => (this.user = data));
		// this.user.subscribe((data: IUser) => (this.usser = data));
	}
}
