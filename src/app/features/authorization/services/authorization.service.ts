import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUser } from '@core/models/User';
import firebase from 'firebase/compat/app';
import { UserFirebaseService } from '@core/services/firebase/firebase-entities/userFirebase.service';
import UserCredential = firebase.auth.UserCredential;
import { CurrentUserService } from '@core/services/user/current-user.service';

@Injectable({
	providedIn: 'root'
})
export class AuthorizationService {
	constructor(private afAuth: AngularFireAuth) {}

	registerUser(user: IUser): Promise<any> {
		return this.afAuth
			.createUserWithEmailAndPassword(user.email, user.password)
			.then((result: UserCredential) => {
				result.user.updateProfile({
					displayName: user.firstName + ' ' + user.lastName,
					photoURL:
						'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
				});
			})
			.catch(error => {
				// console.log('Auth Service: register error', error);
				// console.log('error code', error.code);
				// console.log('error', error);
				return error.code ? { isValid: false, message: error.message } : error;
			});
	}

	registerUserWithGoogle(): Promise<any> {
		return this.afAuth
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then(result => {
				console.log('resultUser: ', result);
				// add user to Firestore
			})
			.catch(error => {
				console.log('Auth Service: register error', error);
				console.log('error code', error.code);
				console.log('error', error);
				return error.code ? { isValid: false, message: error.message } : error;
			});
	}

	loginUser(email: string, password: string): Promise<any> {
		return this.afAuth
			.signInWithEmailAndPassword(email, password)
			.then(result => {
				console.log('resultUser: ', result);
			})
			.catch(error => {
				console.log('Auth Service: login error...');
				console.log('error code', error.code);
				console.log('error', error);
				return error.code ? { isValid: false, message: error.message } : error;
			});
	}
}
