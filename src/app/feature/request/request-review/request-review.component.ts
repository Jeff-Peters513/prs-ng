import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  title: string= "PurchaseRequest Review";
  requestId: number = 0;
  requests: Request[] = []

  constructor(private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
     //get id from the router
     this.route.params.subscribe(parms => this.requestId = parms['id']);
     console.log("requestID = " + this.requestId);
 
     //get request for that requestId
     this.requestSvc.list().subscribe(jr => {
      this.requests = jr.data as Request[];
      console.log("List of Requests ", this.requests);
    });



  }

}
