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

  //api's

  login(item: any) {
    return this.http.post('https://localhost:7288/login', item);
  }
  register(item: any) {
    return this.http.post('https://localhost:7288/register', item);
  }
  logout() {
    return this.http.get('https://localhost:7288/logout');
  }
  creategroup(item: any) {
    return this.http.post('https://localhost:7288/Group/creategroup', item);
  }
  getallgroup(name: string) {
    return this.http.get('https://localhost:7288/Group/getallgroup/' + name);
  }
  getallusers() {
    return this.http.get('https://localhost:7288/getallusers');
  }
  addmember(groupid: number, item: any) {
    return this.http.post('https://localhost:7288/Group/addmember/' + groupid, item);
  }
  getmemberofgroup(groupid: number) {
    return this.http.get('https://localhost:7288/Group/GetMemberofGroup/' + groupid);
  }

  createexpense(item: any) {
    return this.http.post('https://localhost:7288/Expense/createexpense/', item);
  }

  GetExpenseByUser(groupid:number,name:string){
    return this.http.get(`https://localhost:7288/Expense/GetExpenseByUser/${groupid}/${name}`);
   }

   GetExpenseForEveryUser(groupid:number,name:string){
    return this.http.get(`https://localhost:7288/Expense/GetExpenseForEveryUser/${groupid}/${name}`);
   }
 
   GetDescription(groupid:number){
    return this.http.get('https://localhost:7288/Expense/GetDescription/'+groupid);
   }

  GetAllActivity(name:string){
    return this.http.get('https://localhost:7288/Expense/GetActivity/'+name);
  }
  
  TotalExpense(groupid:number){
    return this.http.get('https://localhost:7288/Expense/TotalExpense/'+groupid);
  }
  


  CreateExpenseByAdjustment(item: any) {
    return this.http.post('https://localhost:7288/Expense/CreateExpenseByAdjustment/', item);
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
