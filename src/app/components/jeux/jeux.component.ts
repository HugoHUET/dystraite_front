import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TitreService } from 'src/app/services/titre/titre.service';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';

@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.component.html',
  styleUrls: ['./jeux.component.css']
})
export class JeuxComponent implements OnInit {

  constructor(private titreService: TitreService, public responsiveService: ResponsiveService) { }

  ngOnInit() {
    this.titreService.updateTitle("Jeux");
  }

}