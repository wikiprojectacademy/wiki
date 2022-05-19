import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlyLoggedInUserGuard } from '@shared/_guards/only-logged-in-user.guard';

import { AboutMeComponent } from './pages/about-me/about-me.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ProfilePageComponent } from './profile-page.component';

const routes: Routes = [
	{ path: '', redirectTo: '/profile/about', pathMatch: 'full' },
	{
		path: '',
		component: ProfilePageComponent,
		// canActivate: [OnlyLoggedInUserGuard],
		children: [
			{ path: 'about', component: AboutMeComponent },
			{
				path: 'edit',
				component: EditProfileComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProfileRoutingModule {}
