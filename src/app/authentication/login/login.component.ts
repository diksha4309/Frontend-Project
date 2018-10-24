import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Errors } from 'src/app/models/errors.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errors: Errors = {errors: {}}; 
  model: any = {};
  constructor(private userService: UserService,
              private router: Router){}
  

  ngOnInit() {
  }

  login(credentials:any){
   this.userService.attemptLogin(credentials)
    .subscribe(() => this.router.navigate(['/']),
    err => {
      this.errors = err; });
  }
}
