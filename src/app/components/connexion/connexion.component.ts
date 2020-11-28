import { Component, OnInit } from '@angular/core';
import { TitreService } from 'src/app/services/titre/titre.service';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private utilisateurService: UtilisateurService) { }

  ngOnInit() {
  }

  connect() {
    this.utilisateurService.connect(this.loginForm.get('login').value, this.loginForm.get('password').value, ['/accueil']);
  }

}
