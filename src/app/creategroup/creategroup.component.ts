import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creategroup',
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './creategroup.component.html',
  styleUrl: './creategroup.component.css'
})
export class CreategroupComponent {
  isAppear :boolean= false;

  formData : any ; 
  constructor(private ServiceSrv :ServiceService, private toastr: ToastrService , private router: Router){
   
  }
  
 
  formvalue : FormGroup = new FormGroup({
    Name: new FormControl('',[Validators.required]), 
    
  })
   
  
  onSubmit(){
    this.formData = this.formvalue.value
    this.formData.CreatedBy = this.ServiceSrv.getUserName();
    console.log(this.formData);
    this.isAppear =true;
    this.ServiceSrv.creategroup(this.formData).subscribe( { 
      next: (response:any) => {
        this.isAppear =false;
        console.log('Group Created', response);  
        this.toastr.success("Group Created" , "Success")  
        this.router.navigateByUrl('/home');
      },
      error: (error:any) => {
        this.toastr.error(error.error , "Error")
        console.log(error.error); // "Invalid Credentials!!"
      }
    })
  }
  
}
