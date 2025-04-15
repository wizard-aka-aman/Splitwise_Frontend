import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { AddmemberComponent } from './addmember/addmember.component';
import { AddexpenseComponent } from './addexpense/addexpense.component';
import { ViewmemberComponent } from './viewmember/viewmember.component';
import { ViewexpenseComponent } from './viewexpense/viewexpense.component';

export const routes: Routes = [
    
    {
        path: '',
        redirectTo : 'login',
        pathMatch : 'full'
    } ,
    {
        path: 'login',
        component : LoginComponent
    },
    {
        path: 'register',
        component : RegisterComponent
    } ,
    {
        path: '',
        component : LayoutComponent,
        children:[
            {
                path: 'home',
                component : HomeComponent
            } ,
            {
                path: 'creategroup',
                // this is for lazy loading 
                loadComponent : ()=>
                    import('./creategroup/creategroup.component').then((c)=>c.CreategroupComponent)
            } ,
            {
                path: 'addmember/:groupid',
                component : AddmemberComponent
            } , 
            {
                path: 'addexpense/:groupid',
                component : AddexpenseComponent
            } ,
            {
                path: 'viewexpense/:groupid/:name',
                component : ViewexpenseComponent
            } ,
            {
                path: 'viewmember/:groupid',
                component : ViewmemberComponent
            } ,
        ]
    },{
        path: '**',
        component: PagenotfoundComponent,
    }
    
// <!-- this is a another method which uses the ID from URL  -->
    // ,
    // {
    //     path: 'edit/:id',
    //     component : EditComponent
    // }


    
    //           <!-- this is a another method which uses the ID from BehaviorSubject   -->
    ,
    
];
