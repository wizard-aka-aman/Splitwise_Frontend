import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addmember',
  imports: [FormsModule ,CommonModule],
  templateUrl: './addmember.component.html',
  styleUrl: './addmember.component.css'
})
export class AddmemberComponent {
  data :string[] =[];
  datadto :any;
  groupid :number =0;
  getmemberofgroup :string[] =[];
constructor(private ServiceSrv :ServiceService, private toastr: ToastrService , private router: Router,private route: ActivatedRoute) {
  this.ServiceSrv.getallusers().subscribe((res:any)=>{ 
    this.data = res
    this.ServiceSrv.getmemberofgroup(this.groupid).subscribe((res:any)=>{
          this.getmemberofgroup = res[0]; 
          console.log(this.getmemberofgroup);
          

          this.datadto = this.data.map(item => ({
            name: item,
            isBelong: false
          })); 

          console.log( this.datadto);
    
    
    // Update isBelong to true for users already in the group
    for (let i = 0; i < this.datadto.length; i++) {
      if (this.getmemberofgroup.includes(this.datadto[i].name)) {
        this.datadto[i].isBelong = true;
      }
    }
    
    console.log( this.datadto);
       }) 
        
  }) 
  this.route.paramMap.subscribe(params => {
    this.groupid = Number(params.get('groupid'));
    console.log('Group ID:', this.groupid);
  });
}



addmember(){ 
  // console.log(this.datadto);
  const filteredData:string[] = [];
  this.datadto.forEach((x:any) => {
    if(x.isBelong){
      filteredData.push(x.name);
    }
  });
  console.log(filteredData);
  this.ServiceSrv.addmember(this.groupid , filteredData).subscribe((res:any)=>{
    console.log(res);
  })
 
  
}
}
