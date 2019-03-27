import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat/chat.service';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-chat-splashscreen',
  templateUrl: './chat-splashscreen.component.html',
  styleUrls: ['./chat-splashscreen.component.css']
})
export class ChatSplashscreenComponent implements OnInit {

  pseudo: string;
  serviceUrl : string = environment.defaultServer;

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
  }
  
  login(){
    this.chatService.serviceUrl = this.serviceUrl;
    this.chatService.initSocket();
    this.chatService.login(this.pseudo); 
    this.router.navigateByUrl('\chat');
  }
}
