import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './pages/post-list/post-list.component';
import { PostAddComponent } from './pages/post-add/post-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
	declarations: [PostListComponent, PostAddComponent],
	imports: [
		CommonModule,
		PostRoutingModule,
		MatCardModule,
		MatRippleModule,
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatInputModule,
		MatOptionModule,
		MatSelectModule,
		NgxEditorModule,
		FormsModule
	]
})
export class PostModule {}
