import { Injectable } from '@angular/core';
import { User } from './user';
import { USER } from './mock-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  users = USER;
  currentUser: User

  constructor() { }

  setCurrentUser(user: User){
    this.currentUser = user;
  }

  getCurrentUser(): User{
    return this.currentUser;
  }

  getUsers(): User[]{
    return this.users;
  }
}
