import { Component } from '@angular/core';
import {  Router, RouterLink, RouterOutlet } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet ,RouterLink,CommonModule,FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  title = 'Angular-Pad'; 
  userName :any;
  Data:any = 0;
  Total :number = 0;
  constructor(private ServiceSrv : ServiceService , private router : Router){
    this.userName = this.ServiceSrv.getUserName();

    this.ServiceSrv.TotalExpenseOfLoggedInUser(this.userName).subscribe((res:any)=>{
      this.Data = res;
      console.log(res);
      for (let index = 0; index < this.Data.length; index++) {
      
        this.Total += this.Data[index].value;
        
      }
      console.log(this.Total);
    })
    
    
  }

  onLogout(){
    const isconfirm = confirm("You Sure Want to Logout?");
   if(isconfirm){
    this.ServiceSrv.logout().subscribe({
      next: (res) => {
      console.log(res);
      localStorage.removeItem("userName");
      localStorage.removeItem("password");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("jwt");
      this.router.navigateByUrl('/login')
    }});
   }
  }

}
