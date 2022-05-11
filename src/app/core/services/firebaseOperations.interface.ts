import { Observable } from 'rxjs';
import { DocumentChangeAction } from '@angular/fire/compat/firestore/interfaces';
import { QuerySnapshot } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import WhereFilterOp = firebase.firestore.WhereFilterOp;

/**
 * Main methods for manipulate with documents, and collections, that must be implemented by service
 */
export interface FirebaseOperations<T, ID, S> {
	getDoc(id: ID): Observable<T | undefined>;
	getDocSnapshot(id: ID): Observable<T | undefined>;
	addDoc(id: ID, content: T): Promise<void>;
	addDocWithAutoId(content: T): Promise<string>;
	addDocToSubCollection(id: ID, content: any): Promise<void>;
	updateDoc(id: ID, content: Partial<T>): Promise<void>;
	deleteDoc(id: ID): Promise<void>;
	getCollection(): Observable<T[]>;
	getSubCollection(id: ID): Observable<S[]>;
	getCollectionSnapshot(): Observable<T[]>;
	getCollectionStateChanges(): Observable<DocumentChangeAction<T>[]>;
	getDocumentsWhere(
		fieldName: string,
		operationStr: WhereFilterOp,
		value: any
	): Observable<QuerySnapshot<T>>;
	getDocumentsWherePromise(
		fieldName: string,
		operationStr: WhereFilterOp,
		value: any
	): Promise<QuerySnapshot<T>>;
}
