import { Injectable } from '@angular/core';
import { CanActivate,
         Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ApiService } from './api.service';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private url: string = 'api/auth';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private router:Router) {}

  //Destroy the token
  destroyToken() {
    localStorage.removeItem('jwt_token');
  }
  
  //Get the token from local storage
  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  //Set the token in local storage
  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }
}
