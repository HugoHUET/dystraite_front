import { Component } from '@angular/core';
import { TitreService } from './services/titre.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titre_page: string = "DYSTRAITE";

  constructor(private titreService: TitreService) { }

  ngOnInit() {
    this.titreService.titre$.subscribe(titre => {
      this.titre_page = titre;
    });
  }
}