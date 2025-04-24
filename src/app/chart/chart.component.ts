import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart',
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  Data : any;
  groupid :number = 0;
  TotalExpense :number = 0;
  groupName :string = '';
  isAppear : boolean = false;
constructor(private ServiceSrv : ServiceService , private router : ActivatedRoute){

  this.router.paramMap.subscribe(params =>{
    this.groupid = Number(params.get('groupid')); 
  })
  
  this.ServiceSrv.GetGroup(this.groupid).subscribe((res:any)=>{
    this.groupName = res.name
  })
  this.isAppear =true;
  this.ServiceSrv.TotalExpenseForEveryUserForPerticularGroup(this.groupid).subscribe((res:any)=>{
    this.isAppear =false;
    this.Data = res;
    console.log(res);
    
  })

  this.ServiceSrv.TotalExpense(this.groupid).subscribe((res:any)=>{
    this.TotalExpense = res;
    console.log(res); // aaya
    
  })


}
}
