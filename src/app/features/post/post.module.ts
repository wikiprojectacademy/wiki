import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostRoutingModule } from './post-routing.module';
import { PostAddComponent } from './pages/post-add/post-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxEditorModule } from 'ngx-editor';
import { PostComponent } from './pages/post/post.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
	declarations: [
		PostAddComponent,
		PostComponent,
		SafeHtmlPipe,
		SafeHtmlPipe,
		SafeHtmlPipe
	],
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
		FormsModule,
		MatProgressSpinnerModule,
		MatDividerModule
	]
})
export class PostModule {}
