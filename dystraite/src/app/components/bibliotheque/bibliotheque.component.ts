import { Component, OnInit } from '@angular/core';
import { TitreService } from 'src/app/services/titre.service';

@Component({
  selector: 'app-bibliotheque',
  templateUrl: './bibliotheque.component.html',
  styleUrls: ['./bibliotheque.component.css']
})
export class BibliothequeComponent implements OnInit {

  constructor(private titreService: TitreService) { }

  ngOnInit() {
    this.titreService.updateTitle("Bibliotheque");
  }

}
