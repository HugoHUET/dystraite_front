import { Component, OnInit } from '@angular/core';
import { TitreService } from 'src/app/services/titre.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  constructor(private titreService: TitreService) { }
  

  ngOnInit() {
    this.titreService.updateTitle("Cours");
  }

}
