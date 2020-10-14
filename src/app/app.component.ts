import { Component, ChangeDetectorRef } from '@angular/core';
import { TitreService } from './services/titre/titre.service';
import { Router } from '@angular/router';

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
    '/inscription/ortho/bravo'
  ];
  isPlusSelected = false;
  currentPlusClass = 'plus-initial';

  constructor(private titreService: TitreService, private cd: ChangeDetectorRef, public router: Router) { }

  ngOnInit() {

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