import { Component, OnInit } from '@angular/core';
import { IUser } from '@core/models/User';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-about-me',
	templateUrl: './about-me.component.html',
	styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
	// user: IUser = {
	// 	id: '3',
	// 	firstName: 'Ivan',
	// 	lastName: 'Ivanov',
	// 	email: 'ivanivanov@gmail.com',
	// 	password: 'rgfhfgh32',
	// 	roleId: '1'
	// };

	public user: IUser;
	// private subscription?: Subscription;

	constructor(public userSrv: CurrentUserService) {
		console.log('Constrr');
	}

	ngOnInit(): void {
		// console.log('OnInit');
		// this.userSrv.currentUser$.subscribe(curUser => {
		// 	this.user = curUser;
		// 	console.log('curUser: ', curUser);
		// });
	}

	ngOnDestroy(): void {
		// console.log('Destroy');
		// if (this.subscription) {
		// 	this.subscription.unsubscribe();
		// }
	}
}
