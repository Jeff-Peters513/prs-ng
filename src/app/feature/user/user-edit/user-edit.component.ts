import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  title: string = "User-Edit";
  submitBtnTitle: string = "Edit";
  user: User = new User();
  userId: number = 0;


  constructor(private userSvc: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.userId = parms["id"]);
    this.userSvc.get(this.userId).subscribe(jr => {
      this.user = jr.data as User;
    });
  }
  edit() {
    this.userSvc.edit(this.user).subscribe(jr => {
      if (jr.errors == null) {
        //success
        this.router.navigateByUrl("user/list");
      }
      else {
        console.log("***Error editing movie.", this.user, jr.errors);
      }
    });
  }



}
