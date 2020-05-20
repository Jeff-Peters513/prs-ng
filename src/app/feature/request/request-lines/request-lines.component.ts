import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {
  title: string = "Request-Line-Item(s)";
  titleLines: string = "Line Items";
  submitBtnForRev: string = "Submit for Review";
  requestId: number = 0;
  lineItemId: number = 0;
  request: Request = new Request();
  lineItems: LineItem[] = [];

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
  delete(lineItemId: number) {
    console.log("lineItem Id " + lineItemId);
    this.lineItemSvc.delete(lineItemId).subscribe(jr => {
      if (jr.errors == null) {
        console.log("refreshing page ", jr.data);
        //refresh without item that was deleted
        this.router.navigateByUrl("request/lines/refresh/"+this.requestId);
      }
      else {
        console.log("*****Error deleting Line Item!", lineItemId, jr.errors);
      }
    });
  }
  //submit for reveiw has to change the status from "new" to "Review"
  //then show up on the reveiw list page for authorized users to approve etc..
  setStatus() {
    if (this.request.status == "New" || "new") {
      //ternary may work here and requires less typed code--try later  
      if(this.request.total > 50.00){
          this.request.status = "Review";
          this.edit();
        }else{
          this.request.status = "Approved";
          this.edit();
        }
      }else {
      console.log("Error in changing Status to review!");
    }
  }
    edit() {
      this.requestSvc.edit(this.request).subscribe(jr => {
        if (jr.errors == null) {
          //success and re-route to request-list page
          this.router.navigateByUrl("request/list");
        }
        else {
          console.log("***Error updating to Review Status.", this.request, jr.errors);
        }
      });
    } 
  




}
