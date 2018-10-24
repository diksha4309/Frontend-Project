import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-article-data',
  templateUrl: './article-data.component.html',
  styleUrls: ['./article-data.component.css']
})
export class ArticleDataComponent{
@Input() article:Article
}
