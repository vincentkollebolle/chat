import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat/chat.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat-splashscreen',
  templateUrl: './chat-splashscreen.component.html',
  styleUrls: ['./chat-splashscreen.component.css']
})
export class ChatSplashscreenComponent implements OnInit {

  pseudo: string;
  constructor(private chatService: ChatService, private router: Router) { }
  ngOnInit() {
    this.chatService.initSocket();
  }


  login(){
    this.chatService.login(this.pseudo);
    
    this.router.navigateByUrl('\chat');
  }
}
