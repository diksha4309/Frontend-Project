import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  article: Article = {} as Article;
  articleForm: FormGroup;
  isSubmitting = false;

  constructor(private route:ActivatedRoute,
              private router:Router, private articlesService:ArticlesService,
              private formBuilder:FormBuilder) {
   }

   get f(){
     return this.articleForm.controls;
   }

  ngOnInit() {
    //Provide validation to the form
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      description : ['', Validators.required],
      body : ['', Validators.required]
    });
  
    this.route.data.subscribe((data: {article:Article}) => {
      if(data.article){
        this.article = data.article;
        //To load value in case of editing an article
        this.articleForm.patchValue(data.article);
      }
    });
  }

  submitForm(){
    this.isSubmitting = true;

    if (this.articleForm.invalid) {
      alert("Please fill required fields")
      return;
  }

    //Update the model
    Object.assign(this.article,this.articleForm.value);
    //Post the changes
    this.articlesService.save(this.article).subscribe(
      article => this.router.navigateByUrl('/article/' + article.slug)
    );
  }
}
