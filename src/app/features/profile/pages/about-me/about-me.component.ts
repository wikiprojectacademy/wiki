import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '@core/models/User';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-about-me',
	templateUrl: './about-me.component.html',
	styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit, OnDestroy {
	public user: IUser;
	private subscription: Subscription;

	constructor(private currentUserService: CurrentUserService) {}

	ngOnInit(): void {
		console.log('About me onInit execute');

		// data from currentUser$
		this.subscription = this.currentUserService.currentUser$.subscribe(
			(curUser: IUser) => {
				this.user = curUser;
				console.log(this.user);
			}
		);
	}

	ngOnDestroy() {
		console.log('Unsubscribe');
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
