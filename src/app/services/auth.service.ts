import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  users: User[]



  public loggedUser:string;
  public isloggedIn: Boolean = false;
  public roles:string;


    constructor(private router: Router,private accountServices:AccountService) {
      this.accountServices.fetchAll().subscribe((u)=>{
        this.users=u;
      })
     }

    logout() {
      this.isloggedIn= false;
      this.loggedUser = "";
      this.roles = "";
      localStorage.removeItem('loggedUser');
      localStorage.setItem('isloggedIn',String(this.isloggedIn));
      this.router.navigate(['/login']);
      }
      SignIn(user :User):Boolean{
      let validUser: Boolean = false;
      this.users.forEach((curUser) => {
      if(user.username=== curUser.username && user.password==curUser.password) {
      validUser = true;
      this.loggedUser = curUser.username;
      this.isloggedIn = true;
      this.roles = user.role;
      localStorage.setItem('loggedUser',this.loggedUser);
      console.log
      localStorage.setItem('isloggedIn',String(this.isloggedIn));
      }
      });
      return validUser;
      }
      isAdmin():Boolean{
      if (!this.roles) //this.roles== undefiened
      return false;
      return (this.roles.indexOf('ADMIN') >-1) ;
      ;
      }

      getUsername() {
        return this.loggedUser ;


    }
}
