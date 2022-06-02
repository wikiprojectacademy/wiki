import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ContentShortnerPipe } from './pipes/content-shortner.pipe';
import { MatIconModule } from '@angular/material/icon';
import { PostFilterPipe } from './pipes/post-filter.pipe';
import { TagRemovePipe } from './pipes/tag-remove.pipe';
import { PostSearchPipe } from './pipes/post-search.pipe';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [
		MainComponent,
		ContentShortnerPipe,
		PostFilterPipe,
		TagRemovePipe,
		PostSearchPipe
	],
	imports: [
		CommonModule,
		MainRoutingModule,
		MatCardModule,
		MatRippleModule,
		MatButtonModule,
		MatIconModule,
		SharedModule
	]
})
export class MainModule {}
