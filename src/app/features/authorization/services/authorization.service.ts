import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUser } from '@core/models/User';
import { UserFirebaseService } from '@core/services/firebase/firebase-entities/userFirebase.service';
import firebase from 'firebase/compat/app';

@Injectable({
	providedIn: 'root'
})
export class AuthorizationService {
	constructor(
		private afAuth: AngularFireAuth,
		private userFireStore: UserFirebaseService
	) {}

	async registerUser(registerUser: IUser): Promise<any> {
		try {
			const { user } = await this.afAuth.createUserWithEmailAndPassword(
				registerUser.email,
				registerUser.password
			);
			user.updateProfile({
				displayName: registerUser.firstName + ' ' + registerUser.lastName,
				photoURL:
					'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
			});

			const userId = user.uid;
			registerUser.roleId = '1';
			registerUser.id = userId;
			registerUser.isActivated = true;

			// add user to Firestore
			await this.userFireStore.addUserWithCustomId(userId, registerUser);
			return user;
		} catch (error) {
			return error.code ? { isValid: false, message: error.message } : error;
		}
	}

	async loginUser(email: string, password: string): Promise<any> {
		try {
			const { user } = await this.afAuth.signInWithEmailAndPassword(
				email,
				password
			);
			return user;
		} catch (error) {
			return error.code ? { isValid: false, message: error.message } : error;
		}
	}

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
			newUsersData.email = newUsersData.email.toLowerCase();
			await this.userFireStore.updateUser(currentUsersData.id, newUsersData);

			//update UserEmail
			if (currentUsersData.email !== newUsersData.email) {
				await userData.updateEmail(newUsersData.email);
			}

			//update UserPassword
			if (currentUsersData.password !== newUsersData.password) {
				await userData.updatePassword(newUsersData.password);
			}

			//update UserData
			if (
				currentUsersData.firstName !== newUsersData.firstName ||
				currentUsersData.lastName !== newUsersData.lastName
			) {
				//update User in Firestore
				await userData.updateProfile({
					displayName: newUsersData.firstName + ' ' + newUsersData.lastName
				});
			}
		} catch (error) {
			console.log('error: ', error);
			throw error;
		}
	}

	private async registerUserFromDatabase(registerUser: IUser): Promise<any> {
		try {
			const { user } = await this.afAuth.createUserWithEmailAndPassword(
				registerUser.email,
				registerUser.password
			);
			user.updateProfile({
				displayName: registerUser.firstName + ' ' + registerUser.lastName,
				photoURL:
					'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
			});

			this.userFireStore.updateUser(registerUser.id, { isActivated: true });
			return user;
		} catch (error) {
			return error.code ? { isValid: false, message: error.message } : error;
		}
	}

	async loginUserFromDatabase(email: string, password: string): Promise<any> {
		const user = await this.userFireStore.getUserByEmail(email);

		if (user.isActivated) {
			// login user
			return this.loginUser(email, password);
		} else {
			// register user
			return this.registerUserFromDatabase(user);
		}
	}
}
