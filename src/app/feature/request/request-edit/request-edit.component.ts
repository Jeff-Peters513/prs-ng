import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {
  title: string = "Request-Edit";
  submitBtnTitle: string = "Edit"
  request: Request = new Request();
  message: string ="";
  users: User[]=[];
  requestId: number = 0;


  constructor(private route: ActivatedRoute,
              private router : Router,
              private requestSvc: RequestService,
              private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user= this.sysSvc.loggedInUser;
        
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
    });
  }
    

  edit() {
    this.requestSvc.edit(this.request).subscribe(jr => {
      if (jr.errors == null) {
        //success
        this.router.navigateByUrl("/request/lines/"+ this.requestId);
      }
      else {
        console.log("***Error editing request.", this.request, jr.errors);
      }
    });
  }

}
