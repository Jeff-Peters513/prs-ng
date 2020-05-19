import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LineItemService } from 'src/app/service/line-item.service';
import { LineItem } from 'src/app/model/line-item.class';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent implements OnInit {
  title: string = "PurchaseRequestLineItem Create";
  submitBtnTitle: string = "Create"
  quantity: number;
  products: Product[] = [];
  lineItem: LineItem = new LineItem();
  requestId: number = 0;
  request: Request = new Request();



  constructor(private productSvc: ProductService,
    private lineItemSvc: LineItemService,
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //get id from the router
    this.route.params.subscribe(parms => this.requestId = parms['id']);
    console.log("requestId = " +this.requestId);
    //get request for requestID
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.lineItem.request = jr.data as Request;
      //set request in lineItem
    });
    //call for a list of products for the line-item create page
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });
  }

  create() {
    this.lineItemSvc.create(this.lineItem).subscribe(jr => {
      //if jr.errors is null save was successful
      if (jr.errors == null) {
        //success
        this.router.navigateByUrl("/request/lines/"+ this.requestId);
      }
      else {
        console.log("*******Error creating new Line Item: ", this.lineItem, jr.errors);
      }
    });
  }
}
