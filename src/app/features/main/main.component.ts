import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
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
			name: 'Cateteteat',
			subCategories: [
				{ id: '1-2', name: 'Test nested' },
				{ id: '1-2', name: 'Test nested2' }
			]
		},
		{
			name: 'Empty category',
			subCategories: []
		},
		{
			name: 'Test Name',
			subCategories: [
				{ id: '1-2', name: 'Test nested' },
				{ id: '1-2', name: 'Noooo' },
				{ id: '1-2', name: 'Tfdsfsefed2' },
				{ id: '1-2', name: '14314c 41341341' },
				{ id: '1-2', name: 'Front' }
			]
		}
	];

	constructor() {}

	ngOnInit(): void {}
}
