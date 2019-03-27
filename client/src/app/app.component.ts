import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public translate: TranslateService) {
    translate.setDefaultLang('fr');

    translate.use('fr');

    translate.setTranslation('fr', {
      title: 'Chat',
      server: 'Serveur',
      username: 'Nom d\'utilisateur',
      message: 'Message',
      messages: 'Messages',
      connect: 'Login',
      disconnect: 'Déconnexion',
      send: 'Envoyer',
      connected: ' vient de se connecter',
      disconnected: ' vient de se déconnecter'
    });
    
    translate.setTranslation('br', {
      title: 'Kaoz',
      server: 'Mevel',
      username: 'Anv',
      message: 'Kannad',
      messages: 'Kannadou',
      connect: 'Kevrañ',
      disconnect: 'Disgevrañ',
      send: 'Kaz',
      connected: ' kevr',
      disconnected: ' diskevr'
    });

  }

  switchLang ( locale : String ) {
    switch ( locale ) {
    case 'br':
      this.translate.use('br');
      break;
    case 'fr':
      this.translate.use('fr');
      break;
    }
  }

}
