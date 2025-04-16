import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule ,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 data : any ;
 loggedInUser : string = '';
 
constructor(private ServiceSrv :ServiceService, private toastr: ToastrService , private router: Router) {
    this.ServiceSrv.getallgroup(this.ServiceSrv.getUserName()).subscribe((res:any)=>{
      console.log(res);
      this.data = res
    })

    this.loggedInUser = this.ServiceSrv.getUserName();
  }
}
