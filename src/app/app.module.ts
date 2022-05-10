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
<<<<<<< HEAD
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
=======
import { MatSnackBarModule } from '@angular/material/snack-bar';
>>>>>>> 21abffb9668fe5dde2e4f74b9e32a8b7f3789a53

@NgModule({
	declarations: [AppComponent, HeaderComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CoreModule,
		AuthorizationModule,
		MatToolbarModule,
<<<<<<< HEAD
		MatButtonModule,
		MatIconModule,
=======
		MatSnackBarModule,
>>>>>>> 21abffb9668fe5dde2e4f74b9e32a8b7f3789a53
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
