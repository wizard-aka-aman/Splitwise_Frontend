 
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creategroup',
  imports: [ReactiveFormsModule ,CommonModule],
 templateUrl: './editgroup.component.html',
  styleUrl: './editgroup.component.css'
})
export class EditgroupComponent {
  isAppear :boolean= false;
  groupid:number = 0;
  formData : any ; 
  naam :string = '';
  formvalue : FormGroup = new FormGroup({
    Name: new FormControl( this.naam ,[Validators.required]), 
  })
  constructor(private ServiceSrv :ServiceService, private toastr: ToastrService , 
    private router: Router,private activerouter: ActivatedRoute){
      activerouter.paramMap.subscribe( params => {
      this.groupid = Number(params.get('groupid'));
   })
    activerouter.queryParams.subscribe(params => {
      this.naam = params['name'];
      this.formvalue = new FormGroup({
        Name: new FormControl( this.naam ,[Validators.required]), 
      })
    })
  }
  
  onSubmit(){
    this.formData = this.formvalue.value
    this.formData.CreatedBy = this.ServiceSrv.getUserName();
    console.log(this.formData);
    console.log(this.groupid);
    this.isAppear =true;
    this.ServiceSrv.EditGroup(this.groupid,this.formData).subscribe( { 
      next: (response:any) => {
        this.isAppear =false;
        console.log('Group Name Edited', response);  
        this.toastr.success("Group Name Edited" , "Success")  
        this.router.navigateByUrl('/home');
      },
      error: (error:any) => {
        this.toastr.error(error.error , "Error")
        console.log(error.error); // "Invalid Credentials!!"
      }
    })
  }
  
}
