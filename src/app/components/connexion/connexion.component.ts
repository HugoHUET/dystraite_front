import { Component, OnInit } from '@angular/core';
import { TitreService } from 'src/app/services/titre/titre.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  isLoading = false;

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit() {
  }

  connect() {
    this.isLoading = true;
    this.userService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(response => {
      this.route.navigate(['/accueil']);
    },
      error => {
        this.isLoading = false;
        this.loginForm.get('password').setValue('');
        this.loginForm.get('password').setErrors({
          incorrect: true,
        })
      });
  }

}
