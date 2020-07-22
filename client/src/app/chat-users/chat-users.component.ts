import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  mapUserNotificationsCount: Map<string, number> = new Map();

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    // initialize the map with 0 notification for each user
    this.chatService.onAllUsers()
      .subscribe((users: string[]) => {
        users.forEach(user => {
          this.mapUserNotificationsCount.set(user, 0);
        });
      });
    // when a new message is received, increment the notification count
    this.chatService.onMessage().subscribe(message => {
      if (message.pseudo !== this.currentUser) {
        const count = this.mapUserNotificationsCount.get(message.pseudo);
        this.mapUserNotificationsCount.set(message.pseudo, count + 1);
      }
    });
    this.chatService.onNewUser().subscribe(message => {
      this.mapUserNotificationsCount.set(message.pseudo, 0);
    });
  }

  /**
   * Emition du nom de l'utilisateur si lequel on a cliqué au parent
   * @param user
   */
  onSelectUser(user: string) {
    this.selectUser.emit(user);
  }

  onLogout() {
    this.logout.emit(this.currentUser);
  }
}
