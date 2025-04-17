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
 isAppear :boolean= false;

constructor(private ServiceSrv :ServiceService, private toastr: ToastrService , private router: Router) {
  this.isAppear =true;
    this.ServiceSrv.getallgroup(this.ServiceSrv.getUserName()).subscribe((res:any)=>{
      console.log(res);
      this.isAppear =false;
      this.data = res
    })

    this.loggedInUser = this.ServiceSrv.getUserName();
  }

  recall(){
    this.isAppear =true;
    this.ServiceSrv.getallgroup(this.ServiceSrv.getUserName()).subscribe((res:any)=>{
      console.log(res);
      this.isAppear =false;
      this.data = res
    })

    this.loggedInUser = this.ServiceSrv.getUserName();
  }

  deletegroup(groupid:number){
    const pakka = confirm("Sure you want to delete this group");
   if(pakka){
    this.ServiceSrv.DeleteGroup(groupid,this.ServiceSrv.getUserName()).subscribe({
      next: (response:any) => {
        this.toastr.success("Group Deleted Successfully" , "Success") 
        this.recall();
      },
      error: (error:any) => {
        console.log(error);
        this.recall();
        this.toastr.error(error.error , "Error")
      }
    })
   }
  }
}
