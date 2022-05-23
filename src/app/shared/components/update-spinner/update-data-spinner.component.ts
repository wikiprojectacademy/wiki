import { Component, Input } from '@angular/core';

@Component({
	selector: 'update-data-spinner',
	templateUrl: './update-data-spinner.component.html',
	styleUrls: ['./update-data-spinner.component.scss']
})
export class UpdateDataSpinnerComponent {
	@Input() isLoading: boolean;
	constructor() {}
}
