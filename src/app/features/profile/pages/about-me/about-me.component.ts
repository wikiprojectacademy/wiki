import { Component } from '@angular/core';
import { CurrentUserService } from '@core/services/user/current-user.service';

@Component({
	selector: 'app-about-me',
	templateUrl: './about-me.component.html',
	styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
	constructor(public userSrv: CurrentUserService) {}
}
