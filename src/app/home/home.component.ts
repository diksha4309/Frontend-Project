import { Component, OnInit } from '@angular/core';
import { ArticleList } from '../models/article-list.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService:UserService,
              private router: Router) { }

  isAuthenticated:boolean;
  listConfig: ArticleList = {
    type: 'all',
    filters: {
    }
  };
  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

       if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      }
    )
  }

  setListTo(type: string = '', filters: Object = {}) {
    // set the list object
    this.listConfig = {type: type, filters: filters};
  }
}

