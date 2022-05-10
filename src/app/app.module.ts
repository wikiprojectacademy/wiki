import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { AuthorizationModule } from './features/authorization/authorization.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '@env';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { HeaderComponent } from '@core/components/header/header.component';
import { MainModule } from './features/main/main.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MainComponent } from './features/main/main/main.component';

/**************************************** */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	declarations: [AppComponent, HeaderComponent, MainComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CoreModule,
		AuthorizationModule,
		MatToolbarModule,
		MainModule,
		MatSnackBarModule,
		MatButtonModule,
		MatIconModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore())
	],
	providers: [
		{
			provide: FIREBASE_OPTIONS,
			useValue: environment.firebase
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
