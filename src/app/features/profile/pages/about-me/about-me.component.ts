import { Component, OnInit } from '@angular/core';
import { IUser } from '@core/models/User';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { Subscription } from 'rxjs';
import { DataService } from '../../service/data.service';

@Component({
	selector: 'app-about-me',
	templateUrl: './about-me.component.html',
	styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
	user: IUser;

	constructor(
		//
		private dataService: DataService,
		private currentUserService: CurrentUserService
	) {
		// this.user = currentUserService.currentUser$
		// this.currentUserService.currentUser$.subscribe(curUser => this.user = curUser);
	}

	ngOnInit(): void {
		// data from firestore with session storage
		// if (localStorage.getItem('curUser')) {
		// console.log('Get data from session storage');
		// this.user = JSON.parse(localStorage.getItem('curUser'));
		// } else {
		// console.log('Get data from fise store');
		// this.dataService
		// .getUser(here must be id from current user)
		// .getUser('d5lRYhxnFibepXPUlCEp')
		// .subscribe((data: IUser) => {this.user = data; localStorage.setItem('curUser', JSON.stringify(this.user))});
		// }

		// data from firestore
		// this.dataService
		// 	.getUser('d5lRYhxnFibepXPUlCEp')
		// 	.subscribe((data: IUser) => (this.user = data));

		console.log('About me onInit execute');

		// data from currentUser$
		this.currentUserService.currentUser$.subscribe(
			(curUser: IUser) => (this.user = curUser)
		);

		// data from currentUserService.user
		// this.user = this.currentUserService.user
	}

	// ngOnDestroy() {
	// 	if(this.subscription) {
	// 		this.subscription.unsubscribe();
	// }
	// }
}
