import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article.model';
import { User } from '../models/user.model';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommentsService } from '../services/comments.service';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;

  constructor(private route:ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private commentsService:CommentsService,
              private articlesService:ArticlesService) { }

  ngOnInit() {
    // Retreive the prefetched article
    this.route.data.subscribe(
      (data: { article: Article }) => {
        this.article = data.article;

        // Load the comments on this article
        this.populateComments();
      }
    );

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );
  }

  populateComments() {
    this.commentsService.getAll(this.article.slug)
      .subscribe(comments => this.comments = comments);
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articlesService.destroy(this.article.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
        }
      );
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    const commentBody = this.commentControl.value;
    this.commentsService
      .add(this.article.slug, commentBody)
      .subscribe(
        comment => {
          this.comments.unshift(comment);
          this.commentControl.reset('');
          this.isSubmitting = false;
        }
      );
  }

  onDeleteComment(comment) {
    this.commentsService.destroy(comment.id, this.article.slug)
      .subscribe(
        success => {
          this.comments = this.comments.filter((item) => item !== comment);
        }
      );
  }

}
