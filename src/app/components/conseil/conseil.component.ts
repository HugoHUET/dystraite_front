import { Component, OnInit } from '@angular/core';
import { TitreService } from 'src/app/services/titre/titre.service';

@Component({
  selector: 'app-conseil',
  templateUrl: './conseil.component.html',
  styleUrls: ['./conseil.component.css']
})
export class ConseilComponent implements OnInit {

  constructor(private titreService: TitreService) { }

  ngOnInit() {
    this.titreService.updateTitle("Conseil");
  }

}
