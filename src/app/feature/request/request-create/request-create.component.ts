import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  title: string = "Request-Create";
  submitBtnTitle: string = "Create"
  request: Request = new Request();
  message: string ="";
  users: User[]=[];



  constructor(private requestSvc: RequestService,
              private router: Router,
              private userSvc: UserService,
              private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user= this.sysSvc.loggedInUser;
  }    
      
  save() {
    this.requestSvc.create(this.request).subscribe(jr => {
      //if jr.errors is null save was successful
      if (jr.errors == null) {
        //success
        this.router.navigateByUrl("/request/list");
      }
      else {
        console.log("*******Error creating new request: ", this.request, jr.errors);
      }
    });
  }



}
