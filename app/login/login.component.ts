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
    currentUser : any ;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) { }

    ngOnInit() {
       //if(this.currentUser != null){
         this.currentUser = JSON.parse(localStorage.getItem('userData')); 
         console.log("CurrentData>>>>>",this.currentUser);
       //}
       
    }
    login() {
        if(this.currentUser){
          if(this.currentUser.username == this.model.username && this.currentUser.password == this.model.password){
               this.router.navigate(['/home']);
            }else{
                this.message = "Invalid Username or Password";
            }
        }else{
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
                    }
                );
        }
    }

    
}
