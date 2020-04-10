import { Component, ChangeDetectorRef } from '@angular/core';
import { TitreService } from './services/titre/titre.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titre_page: string = "DYSTRAITE";
  isMobile = true;
  isConnected = true;
  isPlusSelected = false;
  currentPlusClass = 'plus-initial';

  constructor(private titreService: TitreService, private cd:ChangeDetectorRef) { }
  ngOnInit() {
    this.titreService.connect$.subscribe(c => {
      this.isConnected = c;
      this.cd.detectChanges();
    });
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
}