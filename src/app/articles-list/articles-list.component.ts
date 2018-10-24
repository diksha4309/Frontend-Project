import { Component, OnInit, Input } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { ArticleList } from '../models/article-list.model';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent {

  constructor(private articlesService: ArticlesService) { }

  @Input() limit: number;
  @Input()
  set config(config: ArticleList) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: ArticleList;
  results: Article[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [];
    this.loading = true;

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = (this.limit * (this.currentPage - 1));
    }

    this.articlesService.query(this.query)
      .subscribe(data => {
        this.loading = false;
        this.results = data.articles;

        // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
        this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
      });
  }

}
