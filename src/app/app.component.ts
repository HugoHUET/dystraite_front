import { Component, ChangeDetectorRef } from '@angular/core';
import { TitreService } from './services/titre/titre.service';
import { Router } from '@angular/router';
import { Key } from 'protractor';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titre_page: string = "DYSTRAITE";
  isMobile = true;
  isConnected = true;
  allowed_routes = [
    '/accueil',
    '/jeux',
    '/ortophoniste',
    '/cours',
    '/bibliotheque',
    '/conseil',
    '/profil',
    '/inscription',
    '/inscription',
    '/inscription/user',
    '/inscription/ortho',
    '/inscription/user/verif-mail',
    '/inscription/ortho/verif-mail',
    '/inscription/user/finalisation',
    '/inscription/ortho/finalisation',
    '/inscription/user/bravo',
    '/inscription/ortho/bravo',
    'changePassword'
  ];
  isPlusSelected = false;
  currentPlusClass = 'plus-initial';
  appareil = null;
  isKeyboardUp = false;

  constructor(private titreService: TitreService, private cd: ChangeDetectorRef, public router: Router, public userService: UserService) {
    /*if (Capacitor.platform !== "web") {
      const { Keyboard } = Plugins;
      Keyboard.setAccessoryBarVisible({ isVisible: true });
      Keyboard.addListener('keyboardWillShow', (info: KeyboardInfo) => {
        console.log('keyboard did show with height', info.keyboardHeight);
        this.isKeyboardUp = true;
      });
      Keyboard.addListener('keyboardWillHide', () => {
        console.log('keyboard did hide');
        this.isKeyboardUp = false;
      });
    }*/
  }

  ngOnInit() {
    this.context.loggedUser = {
      birthdate: null,
      city: null,
      email: null,
      firstname: null,
      id: null,
      lastname: null,
      latitude: null,
      likedTips: [],
      longitude: null,
      photo: null,
      role: null,
      speechtherapist: null,
      tips: [],
      zipcode: null
    };

    this.userService.loadLoggedUser();

    this.titreService.titre$.subscribe(titre => {
      this.titre_page = titre;
    });


  }
  togglePlus() {
    this.isPlusSelected = !this.isPlusSelected;
    if (this.isPlusSelected) {
      this.currentPlusClass = 'plus-selected';
    } else {
      this.currentPlusClass = 'plus-notselected';
    }
  }
  untogglePlus() {
    this.isPlusSelected = false;
    this.currentPlusClass = 'plus-notselected';
  }
  isRouteAllowed(route) {
    return this.allowed_routes.indexOf(route) !== -1;
  }

}
