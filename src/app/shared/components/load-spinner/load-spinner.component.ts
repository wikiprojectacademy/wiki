import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-load-spinner',
	templateUrl: './load-spinner.component.html',
	styleUrls: ['./load-spinner.component.scss']
})
export class LoadSpinnerComponent {
	@Input() isLoading: boolean;
	constructor() {}
}
