import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

@NgModule({
	declarations: [ProfilePageComponent, AboutMeComponent, EditProfileComponent],

	imports: [
		ProfileRoutingModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule
	],

	exports: [ProfilePageComponent]
})
export class ProfileModule {}
