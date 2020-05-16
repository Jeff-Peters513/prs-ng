import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  title: string = "Product-Create";
  submitBtnTitle: string = "Create"

  product: Product = new Product();

  constructor(private productSvc: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    //do nothing
  }
  save() {
    this.productSvc.create(this.product).subscribe(jr => {
      //if jr.errors is null save was successful
      if (jr.errors == null) {
        //success
        this.router.navigateByUrl("/product/list");
      }
      else {
        console.log("*******Error creating new product: ", this.product, jr.errors);
      }
    });
  }




}
