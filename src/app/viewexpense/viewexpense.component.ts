import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewexpense',
  imports: [CommonModule],
  templateUrl: './viewexpense.component.html',
  styleUrl: './viewexpense.component.css'
})
export class ViewexpenseComponent { 

groupid :number = 0;
amount : number = 0;
name : string = '';
alluseramount : any;
username : string = '';
constructor(private ServiceSrv :ServiceService, private toastr: ToastrService , private router: ActivatedRoute) {

  console.log("asfjWUKEFV");
  
  this.router.paramMap.subscribe(params => {
    this.groupid = Number(params.get('groupid'));
    this.name = params.get('name')!; 
  });
  
this.username = this.ServiceSrv.getUserName();

  this.ServiceSrv.GetExpenseByUser(this.groupid , this.name).subscribe((res:any)=>{
    console.log(res);
    this.amount = res;
  })
  
  this.ServiceSrv.GetExpenseForEveryUser(this.groupid , this.name).subscribe((res:any)=>{
    console.log(res);
    this.alluseramount = res;
  })
}
}
