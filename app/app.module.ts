import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { UserService } from './services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ArticleComponent }  from './articles/index';
import { ArticleService } from './articles/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ArticleComponent
    ],
    providers: [
        UserService,
        ArticleService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }