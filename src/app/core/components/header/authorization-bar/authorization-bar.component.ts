import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-authorization-bar',
	templateUrl: './authorization-bar.component.html',
	styleUrls: ['./authorization-bar.component.scss']
})
export class AuthorizationBarComponent implements OnInit {
	constructor() {}

	@Input() isLoggedIn: boolean = false;

	ngOnInit(): void {}
}
