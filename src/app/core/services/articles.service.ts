import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ApiService } from './api.service';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Article } from '../models/article.model';

@Injectable()
export class ArticlesService {
  constructor(private apiService: ApiService, private messageService: MessageService) { }

  /** GET articles from the server */
  getArticles(): Observable<Article[]> {
    return this.apiService.get('/articles').pipe(
      tap(_ =>
        this.log('fetched articles')),
      catchError(this.handleError<Article[]>('get', [])
      )
    );
  }

  /** GET article by slug. */
  getArticle(slug: string): Observable<Article> {
    return this.apiService.get('/articles/' + slug).pipe(
      tap(_ =>
        this.log(`fetched article slug=${slug}`)),
      catchError(this.handleError<Article>(`getArticle slug=${slug}`)
      )
    );
  }

  destroy(slug: string) {
    return this.apiService.delete('/articles/' + slug);
  }

  add(article: Article): Observable<Article> {
    return this.apiService.post('/articles/', article).pipe(
      tap((newArticle: Article) => this.log(`Added article w/ id = ${newArticle.id}`)),
      catchError(this.handleError<Article>('addArticle')));
  }

  favorite(slug: string): Observable<Article> {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }

  unfavorite(slug: string): Observable<Article> {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ArticlesService: ${message}`);
  }
}
