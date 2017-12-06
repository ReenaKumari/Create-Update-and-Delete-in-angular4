import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ArticleComponent }  from './articles/index';

const appRoutes: Routes = [
    { path: '', component: LoginComponent,pathMatch: 'full' },
    { path: 'home', component: HomeComponent,pathMatch: 'full' },
    { path: 'register', component: RegisterComponent,pathMatch: 'full' },
    { path:'article', component: ArticleComponent,pathMatch: 'full' },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);