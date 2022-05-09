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
		}
	];

	isOpened: boolean = false;

	mockedCateg = [
		{ label: 'test', subc: [{ label: 'ttt' }, { label: 'ttt' }] },
		{ label: 'test', subc: [] }
	];

	constructor() {}

	ngOnInit(): void {}
}
