import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public user:User;
  private apiServerUrl = environment.apiBaseUrl;


  constructor(
    private router: Router,
        private http: HttpClient
  ) { }




public fetchAll():Observable<User[]>{
  return this.http.get<User[]>(`${this.apiServerUrl}/Users/usersAll`);
}

public addUser(user :User){
  return this.http.post<User>(this.apiServerUrl+"/Users/save",user);
}

public delete(id:number){
  return this.http.delete<User>(this.apiServerUrl+'/Users/delete/'+id);

}

}
