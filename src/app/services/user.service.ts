import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private apiService: ApiService,
    private authService: AuthService,
    private route: Router) { }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.authService.setToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.authService.getToken()) {
      this.apiService.get('/user')
        .subscribe(
          data => this.setAuth(data.user)
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.removeAuth();
    }
  }

  removeAuth() {
    // Remove JWT from localstorage
    this.authService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  attemptLogin(credentials: any) {
    return this.apiService
      .post("/users/login", {
        user: credentials
      })
      .pipe(
        map(data => {
          this.authService.setToken(data.user.token);
          this.currentUserSubject.next(data.user);
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
    .put('/user', { user })
    .pipe(map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data.user);
      return data.user;
    }));
  }

  attemptRegister(credentials: any) {
    return this.apiService.post("/users", {
      user: {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password
      }
    }).pipe(
      map(data => {
        this.authService.setToken(data.user.token);
        this.currentUserSubject.next(data.user);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }
}