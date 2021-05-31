import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TitreService } from 'src/app/services/titre/titre.service';

@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.component.html',
  styleUrls: ['./jeux.component.css']
})
export class JeuxComponent implements OnInit {

  constructor(private titreService: TitreService) { }

  ngOnInit() {
    this.titreService.updateTitle("Jeux");
  }

}