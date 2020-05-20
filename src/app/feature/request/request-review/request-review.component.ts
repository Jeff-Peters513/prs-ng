import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  title: string= "PurchaseRequest Review";
  user: User = null;
  requests: Request[] = []

  constructor(private requestSvc: RequestService,
    private sysSvc: SystemService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // confirm logged
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;

     //get requests in review that are not for this.user
     this.requestSvc.findByUserIdNot(this.user.id).subscribe(jr => {
      this.requests = jr.data as Request[];
      console.log("List of Requests ", this.requests);
    });



  }

}
