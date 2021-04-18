import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordResetTokenService } from "src/app/services/passwordResetToken/passwordResetToken.service"
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';

@Component({
  selector: 'app-type',
  templateUrl: './token.component.html',
  styleUrls: ['./../changePassword.component.css', './token.component.css']
})
export class TokenComponent implements OnInit {

  token: string;

  constructor(private route: ActivatedRoute, private passwordResetTokenService: PasswordResetTokenService, public responsiveService: ResponsiveService) {
    this.route.paramMap.subscribe(params => {
      if (params.get('token')) {
        this.token = params.get('token');
        console.log(this.token);
      }
    });
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password1 = form.value.password1;
    const password2 = form.value.password2;

    if (!this.token) {
      window.location.href = '/';
      return;
    }
    if (password1 !== password2) {
      window.alert('Les mots de passes ne sont pas identiques.');
      return;
    }

    this.passwordResetTokenService.changePassword(this.token, email, password1).subscribe(res => {
      if (res) { window.alert('Mot de passe modifié!'); }
    }, err => {
      console.log(err);
      if (err) { window.alert(`Aucun utilisateur n'a été trouvé`); }
    });
  }

  ngOnInit() {
  }

}
