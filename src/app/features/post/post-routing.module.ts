import { PostListComponent } from './pages/post-list/post-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PostAddComponent } from './pages/post-add/post-add.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{ path: '', component: PostListComponent, pathMatch: 'full' },
			{ path: 'add', component: PostAddComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PostRoutingModule {}
