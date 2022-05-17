import { Component } from '@angular/core';
import { CurrentUserService } from '@core/services/user/current-user.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	constructor(public currentUserService: CurrentUserService) {}
}
