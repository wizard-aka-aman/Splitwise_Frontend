import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {

  }

   public BaseUrl :string= 'https://wizardaman.bsite.net';
  //  public BaseUrl :string= 'https://localhost:7288';
  //api's

  login(item: any) {
    return this.http.post(`${this.BaseUrl}/login`, item);
  }
  register(item: any) {
    return this.http.post(`${this.BaseUrl}/register`, item);
  }
  logout() {
    return this.http.get(`${this.BaseUrl}/logout`);
  }
  creategroup(item: any) {
    return this.http.post(`${this.BaseUrl}/Group/creategroup`, item);
  }
  getallgroup(name: string) {
    return this.http.get(`${this.BaseUrl}/Group/getallgroup/` + name);
  }
  getallusers() {
    return this.http.get(`${this.BaseUrl}/getallusers`);
  }
  addmember(groupid: number, item: any) {
    return this.http.post(`${this.BaseUrl}/Group/addmember/` + groupid, item);
  }
  getmemberofgroup(groupid: number) {
    return this.http.get(`${this.BaseUrl}/Group/GetMemberofGroup/` + groupid);
  }

  createexpense(item: FormData) {
    return this.http.post(`${this.BaseUrl}/Expense/createexpense/`, item);
  }

  GetExpenseByUser(groupid:number,name:string){
    return this.http.get(`${this.BaseUrl}/Expense/GetExpenseByUser/${groupid}/${name}`);
   }

   GetExpenseForEveryUser(groupid:number,name:string){
    return this.http.get(`${this.BaseUrl}/Expense/GetExpenseForEveryUser/${groupid}/${name}`);
   }
 
   GetDescription(groupid:number){
    return this.http.get(`${this.BaseUrl}/Expense/GetDescription/`+groupid);
   }

  GetAllActivity(name:string,start:number  ){
    return this.http.get(`${this.BaseUrl}/Expense/GetActivity/${name}/${start}`);
  }
  
  TotalExpense(groupid:number){
    return this.http.get(`${this.BaseUrl}/Expense/TotalExpense/`+groupid);
  }
  
  EditGroup(groupid:number , item:any){
    return this.http.put(`${this.BaseUrl}/Group/EditGroup/`+groupid , item);
  }
  
  CreateExpenseByAdjustment(item: any) {
    return this.http.post(`${this.BaseUrl}/Expense/CreateExpenseByAdjustment/`, item);
  }
  
  CreateSettle(item: any) {
    return this.http.post(`${this.BaseUrl}/Settle/CreateSettle/`, item);
  }
  
  DeleteGroup(groupid:number,name:string){
    return this.http.delete(`${this.BaseUrl}/Group/DeleteGroup/`+groupid+'/'+name);
  }

  GetGroup(groupid:number){
    return this.http.get(`${this.BaseUrl}/Group/GetGroupById/`+groupid);
  }
  
  TotalExpenseForEveryUserForPerticularGroup(groupid:number){
    return this.http.get(`${this.BaseUrl}/Expense/TotalExpenseForEveryUser/`+groupid);
  }
  
  TotalExpenseOfLoggedInUser(name:number){
    return this.http.get(`${this.BaseUrl}/Expense/TotalExpenseOfLoggedInUser/`+name);
  }
  
  // image(item:any,expenseid:number){
    // return this.http.put(`${this.BaseUrl}/Expense/image/`+expenseid , item);
  // }
  
// chat gpt ka h
  image(formData: any, id: number) {
    const uploadData = new FormData();
    uploadData.append('filecollection', formData.Image); // match with parameter name in controller
    return this.http.put(`${this.BaseUrl}/Expense/image/`+id, uploadData);
  }
  


  //functions
  getUserName() {
    let token = localStorage.getItem('jwt');

    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      const username = decodedToken.UserName;
      // console.log(decodedToken);

      return username;
    }
    return token;
  }

  getEmail() {
    let token = localStorage.getItem('jwt');

    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      const Email = decodedToken.Email;
      // console.log(decodedToken);

      return Email;
    }
    return token;
  }

  checkAuthentication(): boolean {
    const token = localStorage.getItem('jwt');
    const isuserName = this.getUserName();


    if (token) {
      // Additional validation logic can be added here 
      if (isuserName != null) {
        return true;
      }
      return false;
    } else {
      if (token) {
        location.reload();
      }
      localStorage.removeItem("jwt");
      return false;
    }
  }
}
