import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personalchat',
  imports: [CommonModule ],
  templateUrl: './personalchat.component.html',
  styleUrl: './personalchat.component.css'
})
export class PersonalchatComponent {
  groupid :number = 0;
  data  :any[] =[];
  isAppear :boolean= false;
  LoggedInUser :string = '';

  constructor(private ServiceSrv : ServiceService , private router : ActivatedRoute , private route : Router) { 
    
   this.LoggedInUser = this.ServiceSrv.getUserName();
    this.isAppear =true;
    this.ServiceSrv.getallusers().subscribe((res:any)=>{ 
      
      this.isAppear =false;
        this.data = res;
        console.log(this.data);
        
    })
  }

  selectItem(item:string){
    this.route.navigateByUrl('personalchat/'+item)
  }
}
