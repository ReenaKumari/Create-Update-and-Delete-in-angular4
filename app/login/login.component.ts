import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {UserService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    users:any;
    message: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) { }

    ngOnInit() {
        
    }
    login() {
        this.userService.getLogin()
            .subscribe(
                data => {
                    this.users=data;
                    if(this.users.username == this.model.username && this.users.password == this.model.password){
                       this.router.navigate(['/home']);
                    }else{
                        this.message = "Invalid Username or Password";
                    }
                },
                error => {
                    this.message = error;
                });
    }

    
}
