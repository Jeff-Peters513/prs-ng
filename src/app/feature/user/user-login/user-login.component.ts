import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  message: string="";
  user: User = new User();

  constructor(private userSvc: UserService,
              private sysSvc: SystemService,
              private router: Router) { }

  ngOnInit(): void {
      // defaulting uname and pwd for testing purposes
      this.user.userName = 'admin';
      this.user.password = 'admin';
  
      // initialize system user to null
      this.sysSvc.loggedInUser = null;
  }
  login() {
    console.log("login called for user:", this.user);
    this.userSvc.login(this.user).subscribe(jr => {
      console.log("jr:", jr);
      if (jr.errors == null) {
        if (jr.data == null) {
          // no error but still no user???
          this.message = "Invalid Username/Password combo.  Retry";
        }
        else {
          // user found should be ok to proceed
          this.user = jr.data as User;
          this.sysSvc.loggedInUser = this.user;
          console.log("setting user in sysSvc...", this.sysSvc.loggedInUser);
          // good login, navigate to 'home' / 'welcome' page
          this.router.navigateByUrl('/welcome');
        }
      }
      else {
        this.message = "Invalid Username/Password combo.  Retry";
      }
    });
  }
}
