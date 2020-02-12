import { Component, OnInit } from '@angular/core';
import { TitreService } from 'src/app/services/titre/titre.service';
import { CoursService } from 'src/app/services/cours/cours.service';
import { Cours } from 'src/app/models/cours/cours.model';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  cours: Cours[];

  constructor(private titreService: TitreService, private coursService: CoursService) {}

  ngOnInit() {
    this.titreService.updateTitle('Cours');
    this.coursService.getCours().subscribe(res => {
      this.cours = res;
    });
  }

}
