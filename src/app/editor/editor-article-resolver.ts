import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Article } from "../models/article.model";
import { Observable } from "rxjs";
import { ArticlesService } from "../services/articles.service";
import { UserService } from "../services/user.service";
import { map } from "rxjs/operators";

@Injectable()
export class EditableArticleResolver implements Resolve<Article>{

    constructor(private articlesService: ArticlesService,
        private userService: UserService,
        private router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> {
        return this.articlesService.get(route.params['slug'])
            .pipe(
                map(
                    article => {
                        if (this.userService.getCurrentUser().username === article.author.username) {
                            return article;
                        }
                        else {
                            this.router.navigate(['/']);
                        }
                    }
                ));
    }

}