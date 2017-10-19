import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../models/index';

@Injectable()
export class UserService {
dataUrl = "app/mockdata";
    constructor(private http: Http) { }

    getLogin() {
   		return this.http.get(this.dataUrl + "/mock-users.json").map((response: Response) => response.json());
  	}
}