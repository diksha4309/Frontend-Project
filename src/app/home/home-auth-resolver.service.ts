import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";
import { take } from "rxjs/operators";

@Injectable()
export class HomeAuthResolver implements Resolve<boolean> {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.userService.isAuthenticated.pipe(take(1));

  }

}