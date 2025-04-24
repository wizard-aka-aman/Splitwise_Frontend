import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipe/filter.pipe';

@Component({
  selector: 'app-viewexpense',
  imports: [CommonModule ,DatePipe , FormsModule ,FilterPipe ],
  templateUrl: './viewexpense.component.html',
  styleUrl: './viewexpense.component.css'
})
export class ViewexpenseComponent { 

groupid :number = 0;
amount : number = 0;
name : string = '';
alluseramount : any;
allsettleamount : any;
username : string = '';
allExpense :any ;
totalExpense :number = 0;
isAppear :boolean= false;

settlevalue :number = 0 ;

createsettle : any = {};

search : string ='';
datadto :any;
constructor(private ServiceSrv :ServiceService, private toastr: ToastrService , private router: ActivatedRoute) {
 
  
  this.router.paramMap.subscribe(params => {
    this.groupid = Number(params.get('groupid'));
    this.name = params.get('name')!; 
  });
  
this.username = this.ServiceSrv.getUserName();
this.isAppear =true;
  this.ServiceSrv.GetExpenseByUser(this.groupid , this.name).subscribe((res:any)=>{
    console.log(res);

    this.amount = res;
    
    this.ServiceSrv.GetExpenseForEveryUser(this.groupid , this.name).subscribe((res:any)=>{
      console.log(res);
      
      this.alluseramount = res;
      this.allsettleamount = res;
      
      this.ServiceSrv.GetDescription(this.groupid).subscribe((res:any)=>{
        
        this.allExpense = res;
        console.log(res);
        
        
        this.ServiceSrv.TotalExpense(this.groupid).subscribe((res:any)=>{
          this.totalExpense = res;
          
          console.log(res);
          
          
          this.ServiceSrv.getmemberofgroup(this.groupid).subscribe((res:any)=>{
            
            console.log(res);
            this.datadto = res[0];
            this.isAppear =  false
          })
        })
      })
    })
  })
}


ReCall(){
  
  this.router.paramMap.subscribe(params => {
    this.groupid = Number(params.get('groupid'));
    this.name = params.get('name')!; 
  });
  
this.username = this.ServiceSrv.getUserName();
this.isAppear =true;
  this.ServiceSrv.GetExpenseByUser(this.groupid , this.name).subscribe((res:any)=>{
    console.log(res);
    this.amount = res;
  })
  
  this.ServiceSrv.GetExpenseForEveryUser(this.groupid , this.name).subscribe((res:any)=>{
    console.log(res);
    this.alluseramount = res;
    this.allsettleamount = res;
  })

  this.ServiceSrv.GetDescription(this.groupid).subscribe((res:any)=>{
    this.allExpense = res;
    console.log(res);
    
  })

  this.ServiceSrv.TotalExpense(this.groupid).subscribe((res:any)=>{
    this.totalExpense = res;
    this.isAppear =false;
    console.log(res);
    
  })
}

settle(name : string , value : number){
   
  this.createsettle.GroupId = this.groupid;
  this.createsettle.PaidTo   = name;
  this.createsettle.PaidBy = this.ServiceSrv.getUserName();
  this.createsettle.Amount = value;
  console.log(this.createsettle);
   
  this.ServiceSrv.CreateSettle(this.createsettle).subscribe((res:any)=>{
    this.toastr.success("Settle up with "+name , "Success");
    this.ReCall();
    console.log(res);
  })
}


selectedImage: string = '';

zoomImage(base64Image: string): void {
  this.selectedImage = 'data:image/png;base64,' + base64Image;
}



}
