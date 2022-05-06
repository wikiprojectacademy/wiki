import { NgModule } from '@angular/core';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './authorization.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Authorization related module
 */
@NgModule({
	// List here all component related to authorization
	declarations: [AuthorizationComponent],
	// Import here all module, that you need to implement your functionality
	imports: [
		AuthorizationRoutingModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule
	],
	exports: [AuthorizationComponent]
})
export class AuthorizationModule {}
