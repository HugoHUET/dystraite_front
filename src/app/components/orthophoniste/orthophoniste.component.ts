import { Component, OnInit } from '@angular/core';
import { TitreService } from 'src/app/services/titre/titre.service';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';

@Component({
  selector: 'app-orthophoniste',
  templateUrl: './orthophoniste.component.html',
  styleUrls: ['./orthophoniste.component.css']
})
export class OrthophonisteComponent implements OnInit {

  constructor(private titreService: TitreService, public responsiveService: ResponsiveService) { }

  ngOnInit() {
    this.titreService.updateTitle("Orthophoniste");
  }

}
