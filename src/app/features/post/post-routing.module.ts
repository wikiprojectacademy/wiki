import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PostAddComponent } from './pages/post-add/post-add.component';
import { OnlyLoggedInUserGuard } from '@shared/_guards/only-logged-in-user.guard';
import { PostComponent } from './pages/post/post.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'add',
				component: PostAddComponent,
				canActivate: [OnlyLoggedInUserGuard]
			},
			{ path: ':id', component: PostComponent },
			{
				path: 'edit/:id',
				component: PostAddComponent,
				canActivate: [OnlyLoggedInUserGuard]
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PostRoutingModule {}
