import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Article, Errors } from 'src/app/core/models';
import { ArticlesService } from 'src/app/core/services';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  article: Article = {} as Article;
  articleForm!: FormGroup;
  tagField = new FormControl();
  errors: Errors = {errors: {}};
  isSubmitting = false;

  public body = ClassicEditor;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) 
    {
      // use the FormBuilder to create a form group
      this.articleForm = this.fb.group({
        title: '',
        description: '',
        body: '',
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
    if(this.article.tagList.indexOf(tag) < 0) {
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

    //post the changes
    // this.articlesService.save(this.article).subscribe(article => this.router.navigateByUrl('/article' + article.slug), err => {
    //   this.errors = err;
    //   this.isSubmitting = true;
    // });

    //test
    this.articlesService.save(this.article).subscribe(article => this.router.navigateByUrl('/'), err => {
      this.errors = err;
      this.isSubmitting = true;
    });
  }

  updateArticle(values: Object) {
    Object.assign(this.article, values);
  }
}
