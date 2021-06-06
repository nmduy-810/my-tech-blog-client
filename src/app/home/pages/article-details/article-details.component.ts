import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/core/models/article.model';
import { ArticleService } from 'src/app/core/services/article.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  article: Article | undefined;

  constructor(private activatedRoute: ActivatedRoute, private articlesService: ArticleService) { }

  getArticle() : void {
    const slug = String(this.activatedRoute.snapshot.paramMap.get('slug'));
    this.articlesService.getArticle(slug).subscribe(article =>
      {
        this.article = article;
      });
  }

  ngOnInit(): void {
    this.getArticle();
  }
}
