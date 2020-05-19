import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from 'src/app/model/request.class';
import { ProductService } from 'src/app/service/product.service';
import { LineItemService } from 'src/app/service/line-item.service';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent implements OnInit {
  title: string = "PurchaseRequestLineItem Edit";
  submitBtnTitle: string = "Change"
  quantity: number;
  products: Product[] = [];
  lineItem: LineItem = new LineItem();
  requestId: number = 0;
  request: Request = new Request();
  lineItemId: number = 0;


  constructor(private productSvc: ProductService,
    private lineItemSvc: LineItemService,
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
   //get id from the router
   this.route.params.subscribe(parms => this.requestId = parms['id']);
   console.log("requestId = " +this.requestId);
   this.route.params.subscribe(parms => this.lineItemId = parms['id']);
   console.log("lineItemId = " +this.lineItemId);
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

  edit() {
    this.lineItemSvc.edit(this.lineItem).subscribe(jr => {
      if (jr.errors == null) {
        //success
        this.router.navigateByUrl("/request/lines/"+ this.requestId);
      }
      else {
        console.log("***Error editing line item.", this.lineItem, jr.errors);
      }
    });
  }

}


