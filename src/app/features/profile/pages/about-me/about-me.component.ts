import { Component, OnInit } from '@angular/core';
import { IUser } from '@core/models/User';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { take } from 'rxjs';

@Component({
	selector: 'app-about-me',
	templateUrl: './about-me.component.html',
	styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
	public user: IUser;

	constructor(private currentUserService: CurrentUserService) {}

	ngOnInit(): void {
		// Contain data from currentUser in user property.
		this.currentUserService.currentUser$
			.pipe(take(1))
			.subscribe((curUser: IUser) => {
				this.user = curUser;
			});
	}
}
