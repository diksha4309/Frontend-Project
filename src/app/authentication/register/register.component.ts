import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Errors } from 'src/app/models/errors.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errors: Errors = {errors: {}};
  model: any = {};
  constructor(private userService:UserService,
              private router:Router) { }

  ngOnInit() {
  }

  register(credentials:any){
    this.userService.attemptRegister(credentials)
    .subscribe(data => this.router.navigate(['/']),err => {
      this.errors = err; });
  }

}
