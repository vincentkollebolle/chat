import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersComponent } from './users/users.component';
import { ChatComponent } from './chat/chat.component';
import { ChatSplashscreenComponent } from './chat-splashscreen/chat-splashscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserEditComponent,
    UsersComponent,
    ChatComponent,
    ChatSplashscreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
