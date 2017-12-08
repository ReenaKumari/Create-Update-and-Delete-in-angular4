import { Component, OnInit } from '@angular/core';
import {FormControl,FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from './article.service';
import { Article } from './article';

@Component({
   moduleId: module.id,
   templateUrl: 'article.component.html',
   styleUrls: ['article.component.css']
})
export class ArticleComponent implements OnInit { 
   allArticles: Article[];
   statusCode: any;
   articleIdToUpdate : any = null;
   processValidation : string = "false";
   articleForm: any;
   currentUser:any;
   
   constructor(private route: ActivatedRoute,
        private router: Router,
        private articleService: ArticleService,
        private formBuilder: FormBuilder) {
        this.articleForm = this.formBuilder.group({
             title: new FormControl('', Validators.required),
             category: new FormControl('', Validators.required)    
         });
   }
   ngOnInit(): void {
     this.currentUser = localStorage.getItem('UserName');
	   this.getAllArticlesByUser();
   } 
   getAllArticlesByUser() {
      this.articleService.getAllArticlesByUser(this.currentUser)
		  .subscribe(
          data => this.allArticles = data,
          errorCode =>  this.statusCode = errorCode
      );   
   }
   onArticleFormSubmit() {
    this.processValidation = "true";   
    if (this.articleForm.invalid) {
         return; 
    } 
      this.preProcessConfigurations();
    let article = this.articleForm.value;
    if (this.articleIdToUpdate === null) { 
        this.articleService.getAllArticles()
       .subscribe(articles => {
       let maxIndex = articles.length - 1;
       let articleWithMaxIndex = articles[maxIndex];
       let articleId = articleWithMaxIndex.id + 1;
       article.id = articleId;
       article.username = localStorage.getItem('UserName');
         this.articleService.createArticle(article)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllArticlesByUser();  
          this.backToCreateArticle();
         },
         errorCode => this.statusCode = errorCode
         );
     });    
    } else { 
        article.id = this.articleIdToUpdate;
        article.username = localStorage.getItem('UserName');    
      this.articleService.updateArticle(article)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllArticlesByUser();  
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);    
    }
   }
   loadArticleToEdit(articleId: string) {
      this.preProcessConfigurations();
      this.articleService.getArticleById(articleId)
        .subscribe(article => {
                this.articleIdToUpdate = article.id;   
                this.articleForm.setValue({ title: article.title, category: article.category });
          this.processValidation = "true";  
            },
            errorCode =>  this.statusCode = errorCode);   
   }
   //Delete article
   deleteArticle(articleId: string) {
      this.preProcessConfigurations();
      this.articleService.deleteArticleById(articleId)
        .subscribe(successCode => {
                //this.statusCode = successCode;
          //Expecting success code 204 from server
          this.statusCode = 204;
            this.getAllArticlesByUser();  
            this.backToCreateArticle();
          },
            errorCode => this.statusCode = errorCode);    
   }
   logout(){
    localStorage.removeItem('UserName');
    this.router.navigate(['/login']);
   }
   preProcessConfigurations() {
      this.statusCode = null;  
   }
   backToCreateArticle() {
      this.articleIdToUpdate = null;
      this.articleForm.reset();   
      this.processValidation = "false";
   }
         
}
    