import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  
  constructor(public responsiveService: ResponsiveService) {
  }

  ngOnInit(){
  }
}
