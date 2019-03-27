import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { USER } from '../mock-user';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: number;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.user =this.userService.getUsers()[this.id];
  }

  backClicked() {
    this.location.back();
  }

}
