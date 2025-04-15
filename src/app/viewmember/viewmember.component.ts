import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewmember',
  imports: [CommonModule],
  templateUrl: './viewmember.component.html',
  styleUrl: './viewmember.component.css'
})
export class ViewmemberComponent {

  groupid :number = 0;
  data  :any[] =[];
  constructor(private ServiceSrv : ServiceService , private router : ActivatedRoute) { 
    
    this.router.paramMap.subscribe(param =>{
      this.groupid = Number(param.get('groupid'));
    })
    this.ServiceSrv.getmemberofgroup(this.groupid).subscribe((res:any)=>{
        this.data = res[0];
        console.log(this.data);
        
    })
  }

}
