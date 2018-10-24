import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { AuthDirective } from './auth.directive';
import { ArticleDataComponent } from './article-data/article-data.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { HttpTokenInterceptor } from './http.token.interceptor';
import { HomeAuthResolver } from './home/home-auth-resolver.service';
import { AuthGuard } from './services/auth-guard';
import { NoAuthGuardService } from './services/no-auth-guard.service';
import { ArticleComponent } from './article/article.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileResolver } from './profile/profile.resolver';
import { EditorComponent } from './editor/editor.component';
import { EditableArticleResolver } from './editor/editor-article-resolver';
import { ArticleResolver } from './article.resolver';
import { ProfileArticlesComponent } from './profile/profile-articles/profile-articles.component';
import { ProfileFavoritesComponent } from './profile/profile-favorites/profile-favorites.component';
import { ArticleCommentComponent } from './article/article-comment/article-comment.component';
import { ErrorsComponent } from './errors/errors.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      isAuthenticated: HomeAuthResolver
    }
  },
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editor/:slug',
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      article: EditableArticleResolver
    }
  },
  {
    path: 'article/:slug',
    component: ArticleComponent,
    resolve: {
      article: ArticleResolver
    }
  },
  {
    path: 'profile/:username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver
    },
    children: [
      {
        path: '',
        component: ProfileArticlesComponent
      },
      {
        path: 'favorites',
        component: ProfileFavoritesComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ArticlesListComponent,
    AuthDirective,
    ArticleDataComponent,
    ArticlePreviewComponent,
    ArticleComponent,
    SettingsComponent,
    ProfileComponent,
    EditorComponent,
    ProfileArticlesComponent,
    ProfileFavoritesComponent,
    ArticleCommentComponent,
    ErrorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    HomeAuthResolver,
    AuthGuard,
    NoAuthGuardService,
    ProfileResolver,
    EditableArticleResolver,
    ArticleResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
