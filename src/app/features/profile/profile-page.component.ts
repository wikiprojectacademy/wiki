import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-profile-page',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
	constructor(public router: Router) {}
}
