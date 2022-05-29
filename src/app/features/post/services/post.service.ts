import { Injectable } from '@angular/core';
import { PostFirebaseService } from '@core/services/firebase/firebase-entities/postFirebase.service';
import { IPost } from '@core/models/Post';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	constructor(private postFirebaseService: PostFirebaseService) {}

	addPost(post: IPost): Promise<string> {
		return this.postFirebaseService.addPost(post);
	}

	addPostWithCustomId(id: string, post: IPost): Promise<void> {
		return this.postFirebaseService.addPostWithCustomId(id, post);
	}

	getPost(id: string): Observable<IPost> | undefined {
		return this.postFirebaseService.getPost(id);
	}
}
