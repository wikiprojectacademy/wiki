import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ContentShortnerPipe } from './pipes/content-shortner.pipe';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
	declarations: [MainComponent, ContentShortnerPipe],
	imports: [
		CommonModule,
		MainRoutingModule,
		MatCardModule,
		MatRippleModule,
		MatButtonModule,
		MatTreeModule
	]
})
export class MainModule {}
