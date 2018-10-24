import { Article } from "./models/article.model";
import { Injectable } from "@angular/core";
import { ArticlesService } from "./services/articles.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from "@angular/router";
import { UserService } from "./services/user.service";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ArticleResolver implements Resolve<Article>{
    constructor(private articlesService:ArticlesService,
                private router:Router,
                private userService:UserService){

    }

    resolve(route:ActivatedRouteSnapshot,
            state:RouterStateSnapshot):Observable<any>{
        return this.articlesService.get(route.params['slug'])
        .pipe(catchError((err) => this.router.navigate(['/'])));
    }
    
}