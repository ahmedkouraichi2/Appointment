import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();


  constructor(private authService : AuthService,
    private router: Router) { }

  ngOnInit(): void {

  }


  onLoggedin(){
    console.log(this.user);
     let isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser){
      this.router.navigate(['/showAdmin']);
      Swal.fire(
        'Connected ',

        'success!'
      )

    }else {
      Swal.fire(
        ' Not Connected ',

        ' Password Or login is not correct !'
      )

  }

    }


}
