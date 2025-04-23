import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipe/filter.pipe';

@Component({
  selector: 'app-activity',
  imports: [CommonModule ,FormsModule ,FilterPipe],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {
  username : string = '';
  allActivity : any ;
  isAppear :boolean= false;
  search : string ='';
  constructor(private ServiceSrv :ServiceService) {
    this.username = this.ServiceSrv.getUserName();
    this.isAppear =true;
    this.ServiceSrv.GetAllActivity(this.username).subscribe((res:any)=>{
      this.allActivity = res ;
      this.isAppear =false;
      this.allActivity.sort((a:any, b:any) => new Date(b.addedWhen).getTime() - new Date(a.addedWhen).getTime());
      console.log(res);


    })
   }
   
}
