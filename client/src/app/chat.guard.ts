import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from './chat/chat.service';

@Injectable({
  providedIn: 'root'
})
export class ChatGuard implements CanActivate {

  constructor( private chatService : ChatService, private router: Router){}
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.chatService.isLoggin()){
        return true;
      }
      this.router.navigate(['/connection']);
      return false;
    }

}
