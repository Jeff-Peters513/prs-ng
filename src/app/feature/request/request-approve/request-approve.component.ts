import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LineItemService } from 'src/app/service/line-item.service';
import { Request } from 'src/app/model/request.class';
import { LineItem } from 'src/app/model/line-item.class';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent implements OnInit {
  title: string = "Purchase Request-Approve/Reject Page";
  titleLines: string = "Pruchase request Line Items";
  submitBtnForAppr: string = "Approve";
  submitBtnForRejct: string = "Reason for Rejection";
  requestId: number = 0;
  lineItemId: number = 0;
  request: Request = new Request();
  lineItems: LineItem[] = [];
  reasonForRejection: string="";


  constructor(private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute,
    private lineItemSvc: LineItemService) { }

  ngOnInit(): void {
    //get id from the router
    this.route.params.subscribe(parms => this.requestId = parms['id']);
    console.log("requestID = " + this.requestId);

    //get request for that requestId
    this.requestSvc.get(this.requestId).subscribe(
      jr => {
        this.request = jr.data as Request;
        console.log("Request found!", this.request);
        console.log("Review status= ", this.request.status)
      });
    //get all lineItems per PR using requestId
    this.lineItemSvc.listAllLineItemPerPR(this.requestId).subscribe(
      jr => {
        this.lineItems = jr.data as LineItem[];
        console.log("Line Items found!", this.lineItems);
      });
  }
  setApproved(){
    if (this.request.status == "Review") {
        this.request.status = "Approved";
        this.edit();
        this.router.navigateByUrl("/request/review");      
      }else {
      console.log("Error in changing Status to Approved!");
    }
  }
  
  setReject(){
    if (this.request.status == "Review") {
      this.request.status = "Rejected";
      this.edit();
      this.router.navigateByUrl("/request/review");      
    }else {
    console.log("Error in changing Status to Rejected!");
  }

  }
  edit() {
    this.requestSvc.edit(this.request).subscribe(jr => {
      if (jr.errors == null) {
        //success and re-route to request-list page
        this.router.navigateByUrl("/request/review");
      }
      else {
        console.log("***Error updating to Review Status.", this.request, jr.errors);
      }
    });

  }
}
