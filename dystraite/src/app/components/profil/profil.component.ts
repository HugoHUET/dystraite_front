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

  constructor(private titreService: TitreService) {
    /*this.titreService.connect$.subscribe(c => {
      console.log(c);
      this.isConnected = c;
    });*/
    this.isConnected = titreService.isConnected();
  }

  ngOnInit() {
    console.log(this.isConnected);
    this.titreService.updateTitle('Profil');
  }

}
