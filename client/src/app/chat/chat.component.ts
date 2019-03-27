import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Message } from './message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: string;
  pseudo: string;
  io: any;
  messages: string[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.initSocket();

    this.io = this.chatService.onMessage()
    .subscribe((message: Message) => {
      this.messages.push(message.pseudo+' : '+ message.message);
    });

    this.io = this.chatService.onNewUser()
    .subscribe((user: string)=> {
      this.messages.push(user+' vient de se connecter')
    });

    this.io = this.chatService.onLogout()
    .subscribe((message: Message)=> {
      this.messages.push(message.pseudo +' vient de se déconnecter ('+message.message+')')
    });
  }

  login(){
    if ( this.pseudo ) {
      this.chatService.login(this.pseudo);
    }
  }

  logout(){
    this.chatService.logout(this.message);
    this.pseudo = '';
    this.message = '';
  }
  
  sendMessage(){
    if ( this.pseudo && this.message ) {
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }

  // Vérifie les touches claviers utilisées (pour envoyer avec Entrée).
  onLoginKey(event: any) {
    if ( event.which == 13 ) { this.login(); }
  }

  // Vérifie les touches claviers utilisées (pour envoyer avec Entrée).
  onMessageKey(event: any) {
    if ( event.which == 13 ) { this.sendMessage(); }
  }

}
