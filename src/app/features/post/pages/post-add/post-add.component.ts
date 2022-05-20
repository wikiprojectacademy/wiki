import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { ICategory as Category } from '@core/models/Category';
import { CategoriesMock } from '../../mocks/post-page.mock';
import { PostFirebaseService } from '../../services/post-firebase.service';
import { IPost } from '@core/models/Post';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-post-add',
	templateUrl: './post-add.component.html',
	styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
	public form: FormGroup;
	categories: Category[] = CategoriesMock;
	editor: Editor;
	html: '';
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
		private snackBar: MatSnackBar
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
	}

	getSubCategories(): string[] {
		if (!this.form.controls['categories'].value) {
			return [];
		}
		return this.form.controls['categories'].value.subCategories;
	}

	onSave(): void {
		const post: IPost = {
			title: this.form.controls['title'].value,
			contentHTML: this.form.controls['contentHTML'].value,
			categoryId: this.form.controls['categories'].value.id,
			createdAt: new Date(),
			subCategory: this.form.controls['subcategories'].value
		};
		this.postService.addPost(post).then(resp => {
			if (resp) {
				this.form.reset();
				this.snackBar.open('Post Successfully Created');
			} else {
				this.snackBar.open('Error Occurred');
			}
		});
	}

	isValidForm(): boolean {
		return this.form.pristine || this.form.invalid;
	}

	ngOnDestroy(): void {
		this.editor.destroy();
	}
}
