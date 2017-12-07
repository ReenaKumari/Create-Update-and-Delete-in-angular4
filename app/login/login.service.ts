import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Login } from './login';

@Injectable()
export class LoginService {
    //URL for CRUD operations
	loginUrl = "http://localhost:3000/logins";
	constructor(private http:Http) { 
	}
    getAllUsers(){
      return this.http.get(this.loginUrl).map((response: Response) => response.json());
    }
    createLogin(login: Login):Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.loginUrl, login, options)
               .map(success => success.status);
    }
	getUserByName(username: string): Observable<Login> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(this.loginUrl +"?username="+ username);
        return this.http.get(this.loginUrl +"?username="+ username)
               .map(this.extractData);
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