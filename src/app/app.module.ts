import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './core/components/header/header.component';
import { CoreModule } from './core/core.module';
import { AuthorizationModule } from './features/authorization/authorization.module';
import { ProfileModule } from './features/profile/profile-page.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
	declarations: [AppComponent, HeaderComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CoreModule,
		AuthorizationModule,
		MatToolbarModule,
		ProfileModule
	],
	providers: [],
	exports: [HeaderComponent],
	bootstrap: [AppComponent]
})
export class AppModule {}
