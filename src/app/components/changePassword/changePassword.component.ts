import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { PasswordResetTokenService } from "src/app/services/passwordResetToken/passwordResetToken.service"

@Component({
  selector: "app-change-password",
  templateUrl: "./changePassword.component.html",
  styleUrls: ["./changePassword.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  isLoading = false;
  constructor(private passwordResetTokenService: PasswordResetTokenService, private route: Router) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    const email = form.value.email;
    this.passwordResetTokenService.requestToken(email).subscribe(res => {
      if (res) { window.alert('Nous vous avons envoyé un lien de modification de votre mot de passe par email.'); this.route.navigate(['/accueil']); }
    }, err => {
      if (err) { window.alert(`Aucun utilisateur n'a été trouvé`); this.isLoading = false; }
    });
  }
}
