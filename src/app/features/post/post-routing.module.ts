import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PostAddComponent } from './pages/post-add/post-add.component';
import { OnlyLoggedInUserGuard } from '@shared/_guards/only-logged-in-user.guard';
import { PostComponent } from './pages/post/post.component';

const routes: Routes = [
	{
		path: '',
		canActivate: [OnlyLoggedInUserGuard],
		children: [
			{ path: 'add', component: PostAddComponent },
			{ path: ':id', component: PostComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PostRoutingModule {}
