import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat';
import { take } from 'rxjs';
import { IPostResponse } from '../../intefaces/ipost-response';
import { CategoryService } from '../../../categories-edit/services/categories.service';
import { ICategoryFull } from '../../../categories-edit/models/icategory-full';
import Timestamp = firebase.firestore.Timestamp;

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {
	post: IPostResponse | null = null;
	category: ICategoryFull;

	constructor(
		private postService: PostService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private categoryService: CategoryService
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
				this.post = post as unknown as IPostResponse;
				this.categoryService
					.getCategoryById(post.categoryId)
					.pipe(take(1))
					.subscribe(c => {
						this.category = c;
					});
			});
	}

	toTimeStamp(date: any): Timestamp {
		return date;
	}

	newDate(timestamp: Timestamp): any {
		return new Date(timestamp.seconds * 1000);
	}

	getSubCategory(): string {
		if (this.category) {
			return this.category.subCategoriesFull.filter(
				category => category?.id === this.post.subCategory
			)[0].name;
		}
		return '';
	}
}
