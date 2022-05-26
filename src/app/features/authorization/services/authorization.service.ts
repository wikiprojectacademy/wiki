import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUser } from '@core/models/User';
import { UserFirebaseService } from '@core/services/firebase/firebase-entities/userFirebase.service';
import firebase from 'firebase/compat/app';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
	providedIn: 'root'
})
export class AuthorizationService {
	constructor(
		private afAuth: AngularFireAuth,
		private userFireStore: UserFirebaseService
	) {}

	async updateUser(newUsersData: IUser, currentUsersData: IUser): Promise<any> {
		//get User
		const user = firebase.auth().currentUser;

		//get UserCredential
		const credential = firebase.auth.EmailAuthProvider.credential(
			currentUsersData.email,
			currentUsersData.password
		);

		try {
			//reauthenticate User
			const { user: userData } = await user.reauthenticateWithCredential(
				credential
			);

			//update User in Firestore
			await this.userFireStore.updateUser(user.uid, newUsersData);

			//update UserData
			if (
				currentUsersData.firstName !== newUsersData.firstName ||
				currentUsersData.lastName !== newUsersData.lastName
			) {
				await userData.updateProfile({
					displayName: newUsersData.firstName + ' ' + newUsersData.lastName
				});
			}
			//update UserEmail
			if (currentUsersData.email !== newUsersData.email) {
				await userData.updateEmail(newUsersData.email);
			}

			//update UserPassword
			if (currentUsersData.password !== newUsersData.password) {
				await userData.updatePassword(newUsersData.password);
			}
		} catch (error) {
			console.log('error: ', error);
			throw error;
		}
	}

	registerUser(user: IUser): Promise<any> {
		return this.afAuth
			.createUserWithEmailAndPassword(user.email, user.password)
			.then((result: UserCredential) => {
				console.log('result: ', result);
				result.user.updateProfile({
					displayName: user.firstName + ' ' + user.lastName,
					photoURL:
						'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
				});
				const userId = result.user.uid;
				user.roleId = '1';
				user.id = userId;
				// add user to Firestore
				this.userFireStore.addUserWithCustomId(userId, user);
			})
			.catch(error => {
				// console.log('Auth Service: register error', error);
				// console.log('error code', error.code);
				// console.log('error', error);
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
				// console.log('Auth Service: login error...');
				// console.log('error code', error.code);
				// console.log('error', error);
				return error.code ? { isValid: false, message: error.message } : error;
			});
	}
}
