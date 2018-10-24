import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(private userService: UserService,
              private router: Router){}
  

  ngOnInit() {
  }

  login(credentials:any){
   this.userService.attemptLogin(credentials)
    .subscribe(data => this.router.navigate(['/']));
  }
}
