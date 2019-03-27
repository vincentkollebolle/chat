import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css']
})
export class ChatUsersComponent implements OnInit {

  io: any;
  users: string[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.io = this.chatService.onAllUsers()
    .subscribe((user: string[])=> {
      this.users = user;
    });
  }

  openSideNav() : void {
    
  }

}
