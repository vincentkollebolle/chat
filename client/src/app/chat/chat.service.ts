import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket: any;
  loggin: boolean = false;

  constructor() { 
  }

  initSocket(){
    this.socket = socketIo('http://2a1bc46f.ngrok.io');
    //this.socket = socketIo('http://localhost:3000');
  }

  login(pseudo: string){
    this.socket.emit('newUser', pseudo);
    this.loggin = true;
  }

  logout(pseudo: string){
    this.socket.emit('logout', pseudo);
    this.loggin = false;
  }

  public sendMessage(message: string){
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }

  public onNewUser(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('newUser', (data: Message) => observer.next(data));
    });
  }

  public onAllUsers(): Observable<string[]> {
    return new Observable<string[]>(observer => {
      this.socket.on('allUsers', (data: string[]) => observer.next(data));
    });
  }

  public onLogout(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('logout', (data: Message) => observer.next(data));
    });
  }

  public isLoggin() : boolean {
    return this.loggin;
  }

}
