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
      title: 'Chat'
    });
    
    translate.setTranslation('br', {
      title: 'Kaoz'
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
