import { Component, OnInit } from '@angular/core';
import { TitreService } from 'src/app/services/titre/titre.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private titreService: TitreService, private route: Router) { }

  ngOnInit() {
  }

  connect() {
    this.titreService.connect();
    this.route.navigate(['/accueil']);
  }

}
