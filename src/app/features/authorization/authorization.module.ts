import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Authorization related module
 */
@NgModule({
	// List here all component related to authorization
	declarations: [RegisterComponent, LoginComponent],
	// Import here all module, that you need to implement your functionality
	imports: [
		CommonModule,
		AuthorizationRoutingModule,
		ReactiveFormsModule,
		MatCardModule,
		MatToolbarModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule
	]
})
export class AuthorizationModule {}
