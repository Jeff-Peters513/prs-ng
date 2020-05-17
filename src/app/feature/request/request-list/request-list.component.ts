import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  title: string = "Request-list";
  
  requests: Request[] = [];


  constructor(private requestSvc: RequestService) { }

  ngOnInit(): void {
    this.requestSvc.list().subscribe(jr => {
      this.requests = jr.data as Request[];
      console.log("List of Requests ", this.requests);
    });
  }

}
