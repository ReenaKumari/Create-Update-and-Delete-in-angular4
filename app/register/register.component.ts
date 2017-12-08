import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl,FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '../login/login.service';
import { Login } from '../login/login';
@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    statusCode: any;
    requestProcessing : string = "false";
    processValidation : string = "false";
    registerForm: any;

    constructor(
        private router: Router,
        private loginService: LoginService,
        private formBuilder: FormBuilder) {
          this.registerForm = this.formBuilder.group({
             firstname: new FormControl('', Validators.required),
             lastname: new FormControl('', Validators.required),
             username: new FormControl('', Validators.required),
             password: new FormControl('', Validators.required)   
         });
        }

    register(){
      this.processValidation = "true";   
      if (this.registerForm.invalid) {
           return; 
      }
      this.preProcessConfigurations();
      let login = this.registerForm.value;
      this.loginService.getAllUsers()
       .subscribe(logins => {
       let maxIndex = logins.length - 1;
       let loginWithMaxIndex = logins[maxIndex];       
        let loginId = loginWithMaxIndex.id + 1;
       
       login.id = loginId;
         this.loginService.createLogin(login)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.router.navigate(['/login']);
         },
         errorCode => this.statusCode = errorCode
         );
     });
       
       
    }
    preProcessConfigurations() {
      this.statusCode = null;
      this.requestProcessing = "true";   
   }
    
}
