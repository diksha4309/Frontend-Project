import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Profile } from "../models/profile.model";
import { Observable } from "rxjs";
import { ProfileService } from "../services/profile.service";
import { catchError } from "rxjs/operators";

@Injectable()
export class ProfileResolver implements Resolve<Profile>{

    constructor(private router:Router,
                private profileService:ProfileService){

    }

    resolve(route:ActivatedRouteSnapshot,
            state: RouterStateSnapshot):Observable<any>{

                return this.profileService.get(route.params['username'])
                .pipe(catchError((err) => this.router.navigate(['/'])));

    }
}