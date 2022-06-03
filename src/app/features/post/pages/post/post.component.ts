import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from '@core/models/Post';
import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;
import { take } from 'rxjs';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {
	post: IPost | null = null;

	constructor(
		private postService: PostService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.getPostId();
	}

	getPostId() {
		if (this.activatedRoute.snapshot.params?.['id']) {
			this.getPost(this.activatedRoute.snapshot.params?.['id']);
		}
	}

	getPost(id: string): void {
		this.postService
			.getPost(id)
			.pipe(take(1))
			.subscribe(post => {
				console.log(post);
				this.post = post;
			});
	}

	toTimeStamp(date: any): Timestamp {
		return date;
	}
}
