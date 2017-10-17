import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/index';
import { UserService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    users: any = {};
    currentUser: any ;

    constructor(private router: Router,
    private userService: UserService) {
        
    }

    ngOnInit() {
       this.currentUser = JSON.parse(localStorage.getItem('userData'));
       this.userDetails();
    }

    userDetails(){
        if(this.currentUser){
          this.users = JSON.parse(localStorage.getItem('userData'));
        }else{
    	    this.userService.getLogin()
    		.subscribe(
    		    data => {
    		        this.users=data;
    		        console.log("Data>>>>>",this.users);
    		    },
    		    error => {
    		       console.log("Error");
    		    });
        }
    }
    loggedOut = function () {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
}