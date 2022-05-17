import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { ProfileRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ProfileGuard } from './service/profile.guard';
import { DataService } from './service/data.service';
import { SubmitDialogComponent } from './pages/edit-profile/submit-dialog/submit-dialog';

@NgModule({
	declarations: [
		ProfilePageComponent,
		AboutMeComponent,
		EditProfileComponent,
		SubmitDialogComponent
	],

	imports: [
		ProfileRoutingModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatIconModule,
		CommonModule,
		// BrowserModule,
		MatDialogModule
	],
	providers: [ProfileGuard, DataService]

	// exports: [ProfilePageComponent]
})
export class ProfileModule {}
