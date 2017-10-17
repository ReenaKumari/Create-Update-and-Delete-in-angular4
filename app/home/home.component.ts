import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { UserService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    users: any = {};

    constructor(private userService: UserService) {
        
    }

    ngOnInit() {
       this.userDetails();
    }

    userDetails(){
	    this.userService.getLogin()
		.subscribe(
		    data => {
		        this.users=data;
		        console.log("Data>>>>>",this.users)

		    },
		    error => {
		       console.log("Error");
		    });
    }
}