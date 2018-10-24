import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile.model';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile:Profile;
  currentUser: User;
  isUser: boolean;

  constructor(private route:ActivatedRoute,
              private userService:UserService) { }

  ngOnInit() {
    this.route.data.pipe(
      concatMap((data: { profile: Profile }) => {
        this.profile = data.profile;
        // Load the current user's data.
        return this.userService.currentUser.pipe(tap(
          (userData: User) => {
            this.currentUser = userData;
            this.isUser = (this.currentUser.username === this.profile.username);
          }
        ));
      })
    ).subscribe();
  }

}
