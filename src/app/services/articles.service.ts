import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ArticleList } from '../models/article-list.model';
import { HttpParams } from '@angular/common/http';
import { Article } from '../models/article.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private apiService:ApiService) { }

  query(config:ArticleList):Observable<{articles:Article[],articlesCount:number}>{

    const Params = {};

    Object.keys(config.filters)
    .forEach((key) => {
      Params[key] = config.filters[key];
    });

    return this.apiService.get('/articles'+((config.type === 'feed') ? '/feed' : ''),
                    new HttpParams({fromObject:Params}));
  }

  get(slug):Observable<Article>{
    return this.apiService.get('/articles/'+ slug)
    .pipe(map(data => data.article));
  }

  save(article):Observable<Article>{
    //Updating an existing article
    if(article.slug){
      return this.apiService.put('/articles/'+ article.slug, {article:article})
      .pipe(map(data => data.article));
    }
    //Create a new article
    else{
      return this.apiService.post('/articles/', {article:article})
      .pipe(map(data => data.article));
    }
  }

  destroy(slug) {
    return this.apiService.delete('/articles/' + slug);
  }
}
