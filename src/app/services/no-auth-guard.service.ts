import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService implements CanActivate{

  constructor(private userService:UserService,
              private router:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.userService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));

  }
}
