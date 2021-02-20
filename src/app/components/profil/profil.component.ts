import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private titreService: TitreService, public userService: UserService, private router: Router) {

    this.isConnected = this.userService.isConnected();
  }

  ngOnInit() {
    this.titreService.updateTitle('Profil');
  }
  logout() {
    this.userService.logout();
    this.router.navigate([''],);

  }
}
