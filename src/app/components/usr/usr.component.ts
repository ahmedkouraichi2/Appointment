import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-usr',
  templateUrl: './usr.component.html',
  styleUrls: ['./usr.component.css']
})
export class UsrComponent implements OnInit {

  users:any;
  constructor(private accountServices:AccountService) { }

  ngOnInit(): void {

  this.getUsers();

  }

  onOpenModal(){

  }
  getUsers(){
    this.accountServices.fetchAll().subscribe((u)=>{
      this.users=u;
    });

  }


  public searchUsers(key: string): void {
    console.log(key);
    const results: User[] = [];
    for (const user of this.users) {
      if (user.username.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      this.getUsers();
    }
  }
}
