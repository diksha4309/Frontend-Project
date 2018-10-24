import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleList } from 'src/app/models/article-list.model';
import { Profile } from 'src/app/models/profile.model';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.css']
})
export class ProfileFavoritesComponent implements OnInit {

  profile: Profile;
  favoritesConfig: ArticleList = {
    type: 'all',
    filters: {}
  };

  constructor(private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: {profile:Profile})=>{
        this.profile = data.profile;
        this.favoritesConfig.filters.favorited = data.profile.username;
      }
    )
  }
}
