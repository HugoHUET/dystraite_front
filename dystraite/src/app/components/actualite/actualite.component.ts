import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours/cours.service';
import { Cours } from 'src/app/models/cours/cours.model';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})

export class ActualiteComponent implements OnInit {

  actuList: Cours[];

  constructor(private coursService: CoursService) {}

  ngOnInit() {
    this.coursService.getCours().subscribe(cours => {
      this.actuList = cours;
    });
  }
}
