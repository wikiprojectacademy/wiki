import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { ICategory, ICategory as Category } from '@core/models/Category';
import { PostFirebaseService } from '@core/services/firebase/firebase-entities/postFirebase.service';
import { IPost } from '@core/models/Post';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { CategoryService } from '../../../categories-edit/services/categories.service';
import { ISubCategory } from '@core/models/SubCategory';
import { ActivatedRoute } from '@angular/router';
import { ICategoryFull } from '../../../categories-edit/models/icategory-full';

@Component({
	selector: 'app-post-add',
	templateUrl: './post-add.component.html',
	styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
	public form: FormGroup;
	categories: Category[];
	editor: Editor;
	html: '';
	post: IPost;
	category: ICategoryFull;
	toolbar: Toolbar = [
		['bold', 'italic'],
		['underline', 'strike'],
		['code', 'blockquote'],
		['ordered_list', 'bullet_list'],
		[{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
		['link', 'image'],
		['text_color', 'background_color'],
		['align_left', 'align_center', 'align_right', 'align_justify']
	];

	constructor(
		private formBuilder: FormBuilder,
		private postService: PostFirebaseService,
		private snackBar: MatSnackBar,
		private activatedRoute: ActivatedRoute,
		private categoryService: CategoryService
	) {
		this.form = formBuilder.group({
			title: ['', [Validators.required]],
			contentHTML: ['', [Validators.required]],
			categories: ['', [Validators.required]],
			subcategories: ['']
		});
	}

	ngOnInit(): void {
		this.editor = new Editor();
		this.categoryService
			.getCategoryAll()
			.pipe(take(1))
			.subscribe(c => {
				this.categories = c;
			});
		this.getPostId();
	}

	getSubCategories(): ISubCategory[] {
		if (!this.form.controls['categories'].value) {
			return [];
		}
		return this.form.controls['categories'].value.subCategoriesFull;
	}

	displayFn(category: Category | ISubCategory): string {
		return category && category.name ? category.name : '';
	}

	onSave(): void {
		const post: IPost = {
			title: this.form.controls['title'].value,
			contentHTML: this.form.controls['contentHTML'].value,
			categoryId: this.form.controls['categories'].value.id,
			createdAt: new Date(),
			subCategory: this.form.controls['subcategories'].value.id
		};
		this.postService.addPost(post).then(resp => {
			if (resp) {
				this.form.reset();
				this.snackBar.open('Post Successfully Created', '', {
					duration: 5000
				});
			} else {
				this.snackBar.open('Error Occurred', '', {
					duration: 5000
				});
			}
		});
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
				this.post = post;
				this.categoryService
					.getCategoryById(post.categoryId)
					.pipe(take(1))
					.subscribe(c => {
						this.category = c;
					});
				this.form.patchValue({ ...post, category: post.categoryId });
			});
	}

	isValidForm(): boolean {
		return this.form.pristine || this.form.invalid;
	}

	ngOnDestroy(): void {
		this.editor.destroy();
	}
	compareWithFn = (el1: ICategory, el2: ICategory) =>
		el1 && el2 && el1.id === el2.id;
}
