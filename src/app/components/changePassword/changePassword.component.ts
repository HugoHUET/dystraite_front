import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-change-password",
  templateUrl: "./changePassword.component.html",
  styleUrls: ["./changePassword.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log(form.value.email);
    window.alert('Nous vous avons envoyé un lien de modification de votre mot de passe par email.');
  }
}
