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
  title: string ="Request-Line-Item(s)";
  titleLines: string = "Line Items";
  requestId: number =0;
  request: Request = new Request();
  lineItems: LineItem [] =[];

  constructor(private requestSvc: RequestService,
              private router: Router,
              private route: ActivatedRoute,
              private lineItemSvc: LineItemService) { }

  ngOnInit(): void {
    //get id from the router
    this.route.params.subscribe(parms => this.requestId = parms['id']);
    //get request for that requestId
    this.requestSvc.get(this.requestId).subscribe(
      jr => {
        this.request = jr.data as Request;
        console.log("Request found!", this.request);
      });
      this.lineItemSvc.listAllLineItemPerPR(this.requestId).subscribe(
        jr => {
          this.lineItems = jr.data as LineItem[];
          console.log("Line Items found!", this.lineItems);
        });
  }

}
