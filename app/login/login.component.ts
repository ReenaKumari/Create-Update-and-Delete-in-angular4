import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { Login } from './login';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    users:any;
    message: any;
    //currentUser : any ;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,) { }

    ngOnInit() {
         //this.currentUser = JSON.parse(localStorage.getItem('userData')); 
       
    }
    login() {
            this.loginService.getUserByName(this.model.username)
                .subscribe(
                    data => {
                        this.users=data[0];
                        if(this.users && this.users.username == this.model.username && this.users.password == this.model.password){
                        localStorage.setItem('UserName',this.model.username);
                        this.router.navigate(['/article']);
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
