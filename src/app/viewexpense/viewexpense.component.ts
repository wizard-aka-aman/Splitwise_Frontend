import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-viewexpense',
  imports: [CommonModule ,DatePipe ],
  templateUrl: './viewexpense.component.html',
  styleUrl: './viewexpense.component.css'
})
export class ViewexpenseComponent { 

groupid :number = 0;
amount : number = 0;
name : string = '';
alluseramount : any;
username : string = '';
allExpense :any ;
totalExpense :number = 0;
constructor(private ServiceSrv :ServiceService, private toastr: ToastrService , private router: ActivatedRoute) {
 
  
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

  this.ServiceSrv.GetDescription(this.groupid).subscribe((res:any)=>{
    this.allExpense = res;
    console.log(res);
    
  })

  this.ServiceSrv.TotalExpense(this.groupid).subscribe((res:any)=>{
    this.totalExpense = res;
    console.log(res);
    
  })
}
}
