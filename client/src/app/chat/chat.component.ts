import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from './chat.service';
import { Message } from './message';
import { ActivatedRoute,Router } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  //recupere l'element #messageInput du DOM
  @ViewChild('messageArea') messageArea: ElementRef;

  message: string;
  pseudo: string;
  io: any;
  messages: Message[] = [];
  users: string[] = [];

  constructor(private chatService: ChatService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {

    
    this.io = this.chatService.onMessage()
    .pipe(filter((message:Message)=>message.message.trim().length>0))
    .subscribe((message: Message) => {
      this.messages.push(message);
    });
    
    this.io = this.chatService.onNewUser()
    .subscribe((message: Message)=> {
      this.messages.push(message)
    });

    this.io = this.chatService.onLogout()
    .subscribe((message: Message)=> {
      this.messages.push(message)
    });

    // Récupère le nom du user
    this.pseudo = this.chatService.pseudo;
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
    this.router.navigate(['/connection']);
  }
  
  sendMessage(){
    if ( this.pseudo && this.message ) {
      this.message = this.message.replace(/(?:\r\n|\r|\n)/g, '<br>');
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }

  /**
   * concetene le pseudo eu debut de la zone de saisie puis focus cette zone
   * @param pseudo 
   */
  concatPseudo(pseudo){
    this.message = "@" + pseudo + " ";
    this.messageArea.nativeElement.focus()
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
