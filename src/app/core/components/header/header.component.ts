import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CurrentUserService } from '@core/services/user/current-user.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	constructor(
		private afAuth: AngularFireAuth,
		public currentUserService: CurrentUserService
	) {}

	logout() {
		this.afAuth.signOut();
	}
}
