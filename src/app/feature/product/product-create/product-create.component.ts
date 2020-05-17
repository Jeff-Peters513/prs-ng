import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  title: string = "Product-Create";
  submitBtnTitle: string = "Create"
  vendors: Vendor[]=[];
  
  product: Product = new Product();

  constructor(private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router) { }

  ngOnInit(): void {
    //call for a list of vendors for the product create page
    this.vendorSvc.list().subscribe( jr => {
      this.vendors = jr.data as Vendor[];
    });
        
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
