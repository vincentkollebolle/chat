import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSelect(user:User): void{
    this.userService.setCurrentUser(user);
  }

  setSize(user: User): string{
    if(user == this.userService.getCurrentUser()){
      return '20px';
    }else{
      return '15px';
    }
  }

}
