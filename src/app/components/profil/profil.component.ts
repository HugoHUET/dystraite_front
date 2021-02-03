import { Component, OnInit } from '@angular/core';
import { TitreService } from 'src/app/services/titre/titre.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  nom = 'ALYSSA BERTRAND';
  score = 3476;

  isConnected = false;

  constructor(private titreService: TitreService, private userService: UserService) {
    //this.isConnected = userService.isConnected();
  }

  ngOnInit() {
    this.titreService.updateTitle('Profil');
  }

}
