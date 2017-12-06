import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Article } from './article';

@Injectable()
export class ArticleService {
    //URL for CRUD operations
	articleUrl = "http://localhost:3000/articles";
	constructor(private http:Http) { 
	}
	//Fetch all articles
    getAllArticles(){
      return this.http.get(this.articleUrl).map((response: Response) => response.json());
    }
	createArticle(article: Article):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.articleUrl, article, options)
               .map(success => success.status);
    }
    getArticleById(articleId: string): Observable<Article> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(this.articleUrl +"/"+ articleId);
        return this.http.get(this.articleUrl +"/"+ articleId)
               .map(this.extractData);
    }   
    //Update article
    updateArticle(article: Article):Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.articleUrl +"/"+ article.id, article, options)
               .map(success => success.status);
    }
    //Delete article    
    deleteArticleById(articleId: string): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.articleUrl +"/"+ articleId)
               .map(success => success.status);
    }
    private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}