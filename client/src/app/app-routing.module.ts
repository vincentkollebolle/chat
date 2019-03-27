import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersComponent } from './users/users.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' }, 
  { path: 'user', component: UsersComponent },
  { path: 'user/:id', component: UserEditComponent },
  { path: 'chat', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
