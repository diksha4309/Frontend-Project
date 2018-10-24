import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';
import { ArticleList } from 'src/app/models/article-list.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.css']
})
export class ProfileArticlesComponent implements OnInit {

  profile: Profile;
  articlesConfig: ArticleList = {
    type: 'all',
    filters: {}
  };

  constructor(private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.articlesConfig = {
          type: 'all',
          filters: {}
        };
        this.articlesConfig.filters.author = this.profile.username;
      }
    );
  }
}
