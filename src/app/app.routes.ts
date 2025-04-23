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
import { authGuard } from './auth.guard';
import { ActivityComponent } from './activity/activity.component';
import { EditgroupComponent } from './editgroup/editgroup.component';
import { ChatComponent } from './chat/chat.component';
import { PersonalchatComponent } from './personalchat/personalchat.component';
import { PeruserchatComponent } from './peruserchat/peruserchat.component';
import { ChartComponent } from './chart/chart.component';

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
                component : HomeComponent,
                canActivate : [authGuard]
            } ,
            {
                path: 'creategroup',
                // this is for lazy loading 
                loadComponent : ()=>
                    import('./creategroup/creategroup.component').then((c)=>c.CreategroupComponent),
                canActivate : [authGuard]
            } ,
            {
                path: 'addmember/:groupid',
                // component : AddmemberComponent,
                loadComponent : ()=>
                    import('./addmember/addmember.component').then((c)=>c.AddmemberComponent),
                canActivate : [authGuard]
            } , 
            {
                path: 'addexpense/:groupid',
                // component : AddexpenseComponent,
                loadComponent : ()=>
                import('./addexpense/addexpense.component').then((c)=>c.AddexpenseComponent),
                canActivate : [authGuard]
            } ,
            {
                path: 'viewexpense/:groupid/:name',
                // component : ViewexpenseComponent,
                 loadComponent : ()=>
                    import('./viewexpense/viewexpense.component').then((c)=>c.ViewexpenseComponent),
                canActivate : [authGuard]
            } ,
            {
                path: 'viewmember/:groupid',
                // component : ViewmemberComponent,
                 loadComponent : ()=>
                    import('./viewmember/viewmember.component').then((c)=>c.ViewmemberComponent),
                canActivate : [authGuard]
            } ,
            {
                path: 'activity',
                // component : ActivityComponent,
                 loadComponent : ()=>
                    import('./activity/activity.component').then((c)=>c.ActivityComponent),
                canActivate : [authGuard]
            } ,
            {
                path: 'editgroup/:groupid',
                // component : EditgroupComponent,
                 loadComponent : ()=>
                    import('./editgroup/editgroup.component').then((c)=>c.EditgroupComponent),
                canActivate : [authGuard]
            } ,
            {
                path: 'chats',
                // component : ChatComponent,
                 loadComponent : ()=>
                    import('./chat/chat.component').then((c)=>c.ChatComponent),
                canActivate : [authGuard]
            } ,
            {
                path: 'personalchat/:groupname',
                // component : PeruserchatComponent,
                 loadComponent : ()=>
                    import('./peruserchat/peruserchat.component').then((c)=>c.PeruserchatComponent),
                canActivate : [authGuard]
            }  ,
            {
                path: 'personalchat',
                // component : PersonalchatComponent,
                 loadComponent : ()=>
                    import('./personalchat/personalchat.component').then((c)=>c.PersonalchatComponent),
                canActivate : [authGuard]
            } 
            ,
            {
                path: 'chart/:groupid',
                // component : ChartComponent,
                 loadComponent : ()=>
                    import('./chart/chart.component').then((c)=>c.ChartComponent),
                canActivate : [authGuard]
            } 
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
