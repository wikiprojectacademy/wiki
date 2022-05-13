import { Component, OnInit } from '@angular/core';
import { IUser } from '@core/models/User';
import { DataService } from '@core/services/data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-about-me',
	templateUrl: './about-me.component.html',
	styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
	// ussser: IUser = {
	// id: 2,
	// firstName: 'Iv',
	// lastName: 'Iv',
	// email: 'ivani',
	// password: 'rgf',
	// role: {
	// id: '1',
	// type: 'user',
	// availableCategoriesToView: [],
	// permissions: []
	// }
	// };
	update: any;
	user: Observable<IUser>;
	usser: IUser;
	constructor(private dataService: DataService) {
		this.user = dataService.getUser('d5lRYhxnFibepXPUlCEp');
	}

	logData() {
		// this.user = this.dataService.getUser('JAhgLILKyTkYWtn32zCh').subscribe(user => console.log(user));
		// this.user.subscribe(snapShot => console.log(snapShot));
		// this.user.subscribe((data: IUser) => this.usser = data);
		// this.httpService.getData().subscribe((data: any) => this.films = data);
		// console.log(this.usser);
		console.log(this.update);
	}

	setData() {
		// this.dataService.updateUser('d5lRYhxnFibepXPUlCEp', this.ussser);
		// this.update.subscribe();
	}
	ngOnInit(): void {
		this.user.subscribe((data: IUser) => (this.usser = data));
	}
}
