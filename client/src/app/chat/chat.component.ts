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

    this.io = this.chatService.onLogout()
    .subscribe((message: Message)=> {
      this.messages.push(message.pseudo +' vient de se déconnecter ('+message.message+')')
    });

    // Récupère le nom du user
    this.pseudo = this.route.snapshot.paramMap.get('id');
    console.log(this.pseudo);
  }

  login(){
    if ( this.pseudo ) {
      this.chatService.login(this.pseudo);
    }
  }

  logout(){
    if ( !this.message ) { this.message = 'Kenavo!'; }
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
