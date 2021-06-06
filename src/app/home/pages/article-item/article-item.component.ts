import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/core/models';
import { ArticlesService } from 'src/app/core/services';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {

  $articles: Article[] = [];

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articlesService.getArticles().subscribe(articles => {
      this.$articles = articles;
      //console.log(articles);
    });
  }
}
