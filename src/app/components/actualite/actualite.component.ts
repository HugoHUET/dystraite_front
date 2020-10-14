import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours/cours.service';
import { Cours } from 'src/app/models/cours/cours.model';
import { TitreService } from 'src/app/services/titre/titre.service';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})

export class ActualiteComponent implements OnInit {

  actuList: Cours[];

  constructor(private coursService: CoursService, private titreService: TitreService) { }

  ngOnInit() {
    this.coursService.getAllCours().subscribe(cours => {
      this.actuList = cours;
    });
    this.titreService.updateTitle('Accueil');

  }
}
