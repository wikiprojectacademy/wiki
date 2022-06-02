import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-stripe-loader',
	templateUrl: './stripe-loader.component.html',
	styleUrls: ['./stripe-loader.component.scss']
})
export class StripeLoaderComponent implements OnInit {
	constructor() {}

	@Input() isLoading: boolean = true;

	ngOnInit(): void {}
}
