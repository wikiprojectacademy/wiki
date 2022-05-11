import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [ProfilePageComponent, AboutMeComponent, EditProfileComponent],

	imports: [
		ProfileRoutingModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatIconModule,
		BrowserModule
	],

	exports: [ProfilePageComponent]
})
export class ProfileModule {}
