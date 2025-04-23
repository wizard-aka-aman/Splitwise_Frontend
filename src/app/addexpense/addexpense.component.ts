import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addexpense',
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './addexpense.component.html',
  styleUrl: './addexpense.component.css'
})
export class AddexpenseComponent {
  formdata : any ;
  customformdata : any ;
  groupid : number = 0;
  isAppear :boolean= false;
 
   
  formvalue : FormGroup = new FormGroup({
    description: new FormControl('',Validators.required),
    amount: new FormControl('',[Validators.required,Validators.pattern('^0*[1-9][0-9]*(\\.[0-9]+)?|0+\\.[0-9]*[1-9][0-9]*$')]),
    paidby :new FormControl('',Validators.required),
    imageFile : new FormControl('',Validators.required),
});

datadto : any[]=[];
customdatadto : any[]=[];

 
constructor(private router :ActivatedRoute , private ServiceSrv :ServiceService ,private route :Router ,private toastr: ToastrService) {
  this.router.paramMap.subscribe(param=>{
    this.groupid = Number(param.get('groupid'));
  })
  console.log(this.groupid);
  this.isAppear =true;
this.ServiceSrv.getmemberofgroup(this.groupid).subscribe((res:any)=>{
   this.datadto = res[0];
   this.customdatadto = res[0];
   this.isAppear =false;
  console.log(res[0]);

  
this.datadto = this.datadto.map(item => ({
  name: item,
  isBelong: false
})); 

this.customdatadto = this.customdatadto.map(item => ({
  name: item,
  decimal : 0
})); 
 console.log(this.customdatadto);
 
  
})


  
}


onSubmit(){

  this.datadto = this.datadto.filter(e => e.isBelong).map(e => e.name);
  this.formdata = this.formvalue.value;
   this.formdata.groupid = this.groupid;
   this.formdata ={
    ...this.formdata , paidto : this.datadto
   }
   console.log(this.datadto);
  console.log(this.formdata);
  this.isAppear =true;
  const expenseData:any = { ...this.formdata };
    expenseData.image  =  "image"; 
    expenseData.description = this.formdata.description
    // delete expenseData.ImageFile
   
console.log(this.formdata.description);

    console.log(expenseData);
    
    
  const fData = new FormData();
  fData.append('amount',expenseData?.amount);
  fData.append('description',expenseData?.description);
  fData.append('groupid',expenseData?.groupid);
  fData.append('image',expenseData?.image);
  fData.append('imageFile',expenseData?.imageFile);
  fData.append('paidby',expenseData?.paidby);
  fData.append('paidto',expenseData?.paidto);
  this.ServiceSrv.createexpense(fData).subscribe({
      //chat ka code
      next: (res: any) => {
        console.log(res);
        this.toastr.success("Expense Created", "Success");
            this.route.navigateByUrl('/home');
        // const formdata = this.formvalue.value;
        // this.ServiceSrv.image(formdata, res.expense.id).subscribe({
        //   next: (response) => {
        //     console.log("Image uploaded", response);
        //     this.toastr.success("Expense Created", "Success");
        //     this.route.navigateByUrl('/home');
        //   },
        //   error: (err) => {
        //     console.log("Image upload error", err);
            
        //     this.toastr.success("Expense Created", "Success");
        //     this.route.navigateByUrl('/home');
        //     // this.toastr.error("Image upload failed");
        //   }
        // });
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error, "Error");
        // your error handling for members
      }







    //mera code
  //  next: (res: any) => {
  //   console.log(res);
     
  //   this.ServiceSrv.image(this.formdata, res.expense.id).subscribe({
  //     next: (response) => {
  //       console.log("Image uploaded", response);
  //       this.toastr.success("Expense Created", "Success");
  //       this.route.navigateByUrl('/home');
  //     },
  //     error: (err) => {
  //       console.log("Image upload error", err);
  //       this.toastr.error("Image upload failed");
  //     }
  //   }); 
  //  },
  //  error:(err:any) =>{
  //   console.log(err);
  //   this.toastr.error(err.error , "Error")  
  //   this.ServiceSrv.getmemberofgroup(this.groupid).subscribe((res:any)=>{
  //     this.datadto = res[0];
  //    console.log(res[0]);
   
     
  //  this.datadto = this.datadto.map(item => ({
  //    name: item,
  //    isBelong: false
  //  })); 
    
     
  //  })
  //  }
  })
    


}
 








selectedFile :any ;
 

// onFileSelected(event: any) {
//   const file = event.target.files[0];
//   if (file) {
//     this.formvalue.patchValue({
//       ImageFile: file
//     });
//     // this.formvalue.get('ImageFile')?.updateValueAndValidity();
//   }
// }

 onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formvalue.patchValue({
        selectedFile : file,
        imageFile: file
      });
      // this.formvalue.get('ImageFile')?.updateValueAndValidity();
    }
  }
  




onCustomSubmit(){
  // this.customdatadto = this.customdatadto.filter(e => e.isBelong)
  this.customformdata = this.formvalue.value;
  this.customformdata.groupid = this.groupid;

  this.customformdata ={
    ...this.customformdata , paidto : this.customdatadto
   }

   console.log(this.customdatadto);
   console.log(this.customformdata);


   this.ServiceSrv.CreateExpenseByAdjustment(this.customformdata).subscribe({
    next: (res: any) => {
     console.log(res);
     this.toastr.success("Custom Expense Created" , "Success")  
     this.route.navigateByUrl('/home');
     
    },
    error:(err:any) =>{
     console.log(err);
     this.toastr.error("Fill Full form" , "Error")  
     this.ServiceSrv.getmemberofgroup(this.groupid).subscribe((res:any)=>{
       this.datadto = res[0];
      console.log(res[0]);
    
      
    this.datadto = this.datadto.map(item => ({
      name: item,
      isBelong: false
    })); 
     
      
    })
    }
   })




}
}
