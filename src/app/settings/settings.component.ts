import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;
  user:User = {} as User;
  errors: Object = {};
  isSubmitting = false;

  constructor(private userService:UserService,
              private router:Router,
              private fb: FormBuilder) { 

    this.settingsForm = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    })
  }

  ngOnInit() {
    //Place editable form fields of the current user's object
    Object.assign(this.user, this.userService.getCurrentUser());
    // Fill the form
    this.settingsForm.patchValue(this.user);
  }

  logout(){
    this.userService.removeAuth();
    this.router.navigate(['/']);
  }

  submitForm(){
    this.isSubmitting = true;

    // update the model
    this.updateUser(this.settingsForm.value);

    this.userService
    .update(this.user)
    .subscribe(
      updatedUser => this.router.navigateByUrl('/profile/' + updatedUser.username),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }

}
