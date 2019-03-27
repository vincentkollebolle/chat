import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Message } from './message';
import { ActivatedRoute } from '@angular/router';

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
  users: string[] = [];

  constructor(private chatService: ChatService, private route : ActivatedRoute,) { }

  ngOnInit() {

    
    this.io = this.chatService.onMessage()
    .subscribe((message: Message) => {
      this.messages.push(message.pseudo+' : '+ message.message);
    });
    
    this.io = this.chatService.onNewUser()
    .subscribe((user: string)=> {
      this.messages.push(user+' vient de se connecter')
    });
    
    this.io = this.chatService.onAllUsers()
    .subscribe((user: string[])=> {
      this.users = user;
    });
    
    this.io = this.chatService.onLogout()
    .subscribe((message: Message)=> {
      this.messages.push(message.pseudo +' vient de se déconnecter ('+message.message+')')
    });

    // Récupère le nom du user
    this.pseudo = this.route.snapshot.paramMap.get('id');
    console.log(this.pseudo);
  }

  login(){
    this.chatService.login(this.pseudo);
  }

  logout(){
    this.chatService.logout(this.message);
    this.pseudo = '';
    this.message = '';
  }
  
  sendMessage(){
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}
