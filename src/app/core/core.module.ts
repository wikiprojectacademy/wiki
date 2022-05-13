import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';

// Components
import { NavigationBarComponent } from './components/header/navigation-bar/navigation-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthorizationBarComponent } from './components/header/authorization-bar/authorization-bar.component';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
	declarations: [
		NavigationBarComponent,
		HeaderComponent,
		AuthorizationBarComponent
	],
	imports: [
		HttpClientModule,
		MatButtonModule,
		MatIconModule,
		MatSnackBarModule,
		MatToolbarModule,
		BrowserModule,
		AppRoutingModule
	],
	exports: [HeaderComponent]
})
export class CoreModule {
	// It will throw error, in console, if you try to import CoreModule
	// somewhere else than AppModule
	constructor(@Optional() @SkipSelf() core: CoreModule) {
		if (core) {
			throw new Error('You should import core module only in the root module');
		}
	}
}
