import { Component, OnInit } from '@angular/core';
import { TitreService } from 'src/app/services/titre/titre.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  nom = 'ALYSSA BERTRAND';
  score = 3476;

  isConnected = false;
  constructor(private titreService: TitreService) { }

  ngOnInit() {
    this.titreService.updateTitle('Profil');
  }

}
