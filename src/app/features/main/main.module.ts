import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '@shared/shared.module';

import { MainComponent } from './main.component';
import { PostSearchPipe } from './pipes/post-search.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PostFilterPipe } from './pipes/post-filter.pipe';
import { TagRemovePipe } from './pipes/tag-remove.pipe';
import { ContentShortnerPipe } from './pipes/content-shortner.pipe';

import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	declarations: [
		MainComponent,
		ContentShortnerPipe,
		PostFilterPipe,
		TagRemovePipe,
		PostSearchPipe,
		SidebarComponent
	],
	imports: [
		CommonModule,
		MainRoutingModule,
		MatCardModule,
		MatRippleModule,
		MatButtonModule,
		MatIconModule,
		SharedModule,
		MatTooltipModule
	]
})
export class MainModule {}
