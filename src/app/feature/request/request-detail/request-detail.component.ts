import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  title: string ="Request-Detail";
  id: number = 0;
  request: Request = new Request();
  requestId: number =0;


  constructor(private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute)  { }

  ngOnInit(): void {

      //get id from the router
      this.route.params.subscribe(parms => this.requestId = parms['id']);
      //get request for that requestId
      this.requestSvc.get(this.requestId).subscribe(
        jr => {
          this.request = jr.data as Request;
          console.log("Request found!", this.request);
        });
  }
  delete() {
    this.requestSvc.delete(this.requestId).subscribe(jr => {
      if (jr.errors == null) {
        console.log(jr.data);
        this.router.navigateByUrl("/request/list");
      }
      else {
        console.log("*****Error deleting product.", this.requestId, jr.errors);
      }
    });
  }

}
