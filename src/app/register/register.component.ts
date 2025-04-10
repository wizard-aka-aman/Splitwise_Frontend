 
import { Component } from '@angular/core'; 
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink ,ReactiveFormsModule ,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formvalue : FormGroup = new FormGroup({
    username : new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/)]),
  })
   
  formData : any ;
  fromEmail : any;
  isCompleted :boolean = false ;
  constructor(private ServiceSrv : ServiceService,private toastr: ToastrService , private router : Router ) {

    const user = this.ServiceSrv.getUserName();
    if(user!= null){
     this.router.navigateByUrl('/home')
    }
 
   }
  
   sendEmail(){
    this.formData = this.formvalue.value
    console.log("this.formData.email : "+this.formData.email);  
    localStorage.setItem("email" , this.formData.email)  
        this.fromEmail = this.formvalue.value ;
         
        this.isCompleted = true;
        this.ServiceSrv.register(this.fromEmail).subscribe({
          next: (response:any) => {
            this.toastr.success("Register Successfully","Success"); 
            localStorage.setItem("username" , this.formData.username)
            localStorage.setItem("password" , this.formData.password)
            this.isCompleted = false;
            this.router.navigateByUrl('/login');
          },
          error:(err:any)=>{
            this.isCompleted = false;
            console.log(err.error);
            
            this.toastr.error(err.error,"Error");
          }
           
        }) 
   }
  
}
