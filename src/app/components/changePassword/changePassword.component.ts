import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { PasswordResetTokenService } from "src/app/services/passwordResetToken/passwordResetToken.service"

@Component({
  selector: "app-change-password",
  templateUrl: "./changePassword.component.html",
  styleUrls: ["./changePassword.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  constructor(private passwordResetTokenService: PasswordResetTokenService) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    console.log(email);
    this.passwordResetTokenService.requestToken(email);
    window.alert('Nous vous avons envoyé un lien de modification de votre mot de passe par email.');
  }
}
