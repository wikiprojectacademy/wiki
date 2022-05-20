import * as functions from 'firebase-functions';
import { auth } from 'firebase-admin';
import UserRecord = auth.UserRecord;

const admin = require('firebase-admin');
admin.initializeApp();

export const createUser = functions.firestore
	.document('users/{userId}')
	.onCreate(async (snapshot, context) => {
		// here we need get all user data
		const userId = context.params.userId;
		const fullName = snapshot.get('firstName') + ' ' + snapshot.get('lastName');
		// create user through admin sdk
		const newUser: UserRecord = await admin.auth().createUser({
			disabled: false,
			displayName: fullName,
			email: snapshot.get('email'),
			password: snapshot.get('password')
		});
		return await admin
			.firestore()
			.collection('users')
			.doc(userId)
			.update({ id: newUser.uid });
		// update userId in users collection with created uid
	});
