import { Component, OnInit } from '@angular/core';
import { TitreService } from 'src/app/services/titre/titre.service';
import { Livre } from 'src/app/models/livre/livre.model';
import { LivreService } from 'src/app/services/livre/livre.service';

@Component({
  selector: 'app-bibliotheque',
  templateUrl: './bibliotheque.component.html',
  styleUrls: ['./bibliotheque.component.css']
})
export class BibliothequeComponent implements OnInit {

  livres: Livre[];

  constructor(private titreService: TitreService, private livreService: LivreService) { }

  ngOnInit() {
    this.titreService.updateTitle("Bibliotheque");
    this.livreService.getAllLivre().subscribe(res => {
      this.livres = res;
    });
  }

}
