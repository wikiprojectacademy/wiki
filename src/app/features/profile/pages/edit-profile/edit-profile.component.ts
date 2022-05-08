import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
	changeProfileForm: any;

	constructor() {}

	ngOnInit(): void {
		this.changeProfileForm = new FormGroup({
			firstName: new FormControl('Data.firstName'),
			lastName: new FormControl('Data.lastName'),
			email: new FormControl('Data.email'),
			password: new FormControl('Data.password')
		});
	}

	changeProfile() {
		console.log(this.changeProfileForm.value);
	}
}
