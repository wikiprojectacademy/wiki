import { Injectable } from '@angular/core';
import { FirebaseCrudService } from '@core/services/firebase/firebase-api/firebaseCrud.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IPost } from '@core/models/Post';

@Injectable({
	providedIn: 'root'
})
export class PostFirebaseService extends FirebaseCrudService<
	IPost,
	string,
	any
> {
	constructor(protected _firebase: AngularFirestore) {
		super('posts', 'none', _firebase);
	}

	addPost(post: IPost): Promise<string> {
		return this.addDocWithAutoId(post);
	}
}
