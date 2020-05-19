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
  submitBtnForRev: string ="Submit for Review";
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
        this.requestSvc.get(this.requestId).subscribe(
          jr => {
            this.request = jr.data as Request;
            console.log("Request found!", this.request);
          });
          //now add the lineItem for this purchase request only
        this.lineItemSvc.listAllLineItemPerPR(this.requestId).subscribe(
          jr => {
            this.lineItems = jr.data as LineItem[];
            console.log("Line Items found!", this.lineItems);
          });
      }
      else {
        console.log("*****Error deleting Line Item!", lineItemId, jr.errors);
      }
    });
  }
}
