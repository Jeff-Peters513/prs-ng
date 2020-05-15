import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {
  title: string = "Vendor-Create";
  submitBtnTitle: string = "Create"

  vendor: Vendor = new Vendor();


  constructor(private vendorSvc: VendorService,
              private router: Router) { }

  ngOnInit(): void {
    //do nothing
  }

  save() {
    this.vendorSvc.create(this.vendor).subscribe(jr => {
      //if jr.errors is null save was successful
      if (jr.errors == null) {
        //success
        this.router.navigateByUrl("/vendor/list");
      }
      else {
        console.log("*******Error creating new vendor: ", this.vendor, jr.errors);
      }
    });
  }
}
