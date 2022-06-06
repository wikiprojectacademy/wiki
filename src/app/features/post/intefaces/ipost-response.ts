import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

export interface IPostResponse {
	id?: string;
	title: string;
	contentHTML: string;
	categoryId: string; // Id of category
	createdAt?: Timestamp; // creation timestamp
	updatedAt?: Timestamp; // last edit/update timestamp
	subCategory?: string; // Id of subcategory
}
