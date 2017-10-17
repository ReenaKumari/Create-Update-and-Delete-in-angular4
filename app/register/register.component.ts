import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {UserService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    user: any = {};

    constructor(
        private router: Router,
        private userService: UserService) { }

    register(){
       this.user.firstName = this.model.firstName;
       this.user.lastName = this.model.lastName;
       this.user.username = this.model.username;
       this.user.password = this.model.password;
       localStorage.setItem("userData", this.user);
       this.router.navigate(['/login']);
    }
}
