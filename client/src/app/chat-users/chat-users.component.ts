import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css']
})
export class ChatUsersComponent implements OnInit {

  //permet d'echanger des données avec le parent
  @Output() selectUser: EventEmitter<any> = new EventEmitter();
  @Output() logout: EventEmitter<any> = new EventEmitter();

  @Input() currentUser: string;

  io: any;
  users: string[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.io = this.chatService.onAllUsers()
    .subscribe((user: string[])=> {
      this.users = user;
    });
  }

  /**
   * Emition du nom de l'utilisateur si lequel on a cliqué au parent
   * @param user 
   */
  onSelectUser(user: string) {
    this.selectUser.emit(user);
  }

  onLogout(){
    this.logout.emit(this.currentUser);
  }
}
