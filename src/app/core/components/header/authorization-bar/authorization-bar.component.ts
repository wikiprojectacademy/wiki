import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
	selector: 'app-authorization-bar',
	templateUrl: './authorization-bar.component.html',
	styleUrls: ['./authorization-bar.component.scss']
})
export class AuthorizationBarComponent implements OnInit {
	constructor(private afAuth: AngularFireAuth, private routes: Router) {}

	@Input() isLoggedIn: boolean;

	ngOnInit(): void {}

	logout() {
		this.afAuth.signOut();
		this.routes.navigateByUrl('/main');
	}
}
