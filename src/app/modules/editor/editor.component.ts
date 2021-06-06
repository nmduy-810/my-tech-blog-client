import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Article } from 'src/app/core/models/article.model';
import { ArticleService } from 'src/app/core/services/article.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  article: Article = {} as Article;
  articleForm!: FormGroup;
  tagField = new FormControl();
  isSubmitting = false;

  public content = ClassicEditor;

  constructor(
    private articleService: ArticleService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    // use the FormBuilder to create a form group
    this.articleForm = this.fb.group({
      title: '',
      seoTitle: '',
      slug: '',
      summary: '',
      body: '',
      content: '',
      thumbnailImage: ''

    });

    //Initialized tagLists as empty array
    this.article.tagList = [];
  }

  ngOnInit(): void {
    // If there's an article prefetched, load it
  }

  addTag() {
    //retrieve tag control
    const tag = this.tagField.value;

    //only add tag if it does not exists yet
    if (this.article.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }

    //clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }

  submitForm() {
    this.isSubmitting = true;

    //update the model
    this.updateArticle(this.articleForm.value);

    this.articleService.add(this.article).subscribe(article => this.router.navigateByUrl('/'), err => {
      this.isSubmitting = true;
    });
  }

  updateArticle(values: Object) {
    Object.assign(this.article, values);
  }
}
