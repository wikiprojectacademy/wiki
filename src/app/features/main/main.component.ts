import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '@core/models/User';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
	mockedPosts = [
		{ title: 'title number one', content: 'test content' },
		{ title: 'SUPER TITLE', content: 'test content medium medium test test' },
		{
			title: 'Test test test',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet metus mollis, faucibus purus sit amet, blandit massa. Nunc luctus tra tra fsdgesgse fesgfgesgfesg e vgsrgrd'
		},
		{
			title: 'Test test test',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet metus mollis, faucibus purus sit amet, blandit massa. Nunc luctus tra tra fsdgesgse fesgfgesgfesg e vgsrgrd'
		},
		{
			title: 'Test test test',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet metus mollis, faucibus purus sit amet, blandit massa. Nunc luctus tra tra fsdgesgse fesgfgesgfesg e vgsrgrd'
		},
		{
			title: 'Test test test',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet metus mollis, faucibus purus sit amet, blandit massa. Nunc luctus tra tra fsdgesgse fesgfgesgfesg e vgsrgrd'
		},
		{
			title: 'Test test test',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet metus mollis, faucibus purus sit amet, blandit massa. Nunc luctus tra tra fsdgesgse fesgfgesgfesg e vgsrgrd'
		},
		{
			title: 'Test test test',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet metus mollis, faucibus purus sit amet, blandit massa. Nunc luctus tra tra fsdgesgse fesgfgesgfesg e vgsrgrd'
		}
	];

	isOpened: boolean = false;

	mockedCateg = [
		{
			name: 'Test Name',
			subCategories: [{ id: '1-2', name: 'Test nested' }]
		},
		{
			name: 'Program',
			subCategories: [
				{ id: '1-2', name: 'Front' },
				{ id: '1-2', name: 'Back' }
			]
		},
		{
			name: 'Empty category',
			subCategories: []
		},
		{
			name: 'Food',
			subCategories: [
				{ id: '1-2', name: 'Fruit' },
				{ id: '1-2', name: 'Vegetables' },
				{ id: '1-2', name: 'Bread' },
				{ id: '1-2', name: 'Meat' },
				{ id: '1-2', name: 'Something else' }
			]
		}
	];

	// for tests *****************************************
	public user: IUser;
	private subscription?: Subscription;

	constructor(private userSrv: CurrentUserService) {}

	ngOnInit(): void {
		this.subscription = this.userSrv.currentUser$.subscribe(curUser => {
			this.user = curUser;
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
