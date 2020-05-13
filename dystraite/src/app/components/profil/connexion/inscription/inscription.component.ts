import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  constructor() { }

  noChoice: boolean = true;
  user: boolean = false;
  ortho: boolean = false;

  ngOnInit() {
  }
  showOrtho() {
    this.noChoice = false;
    this.user = false;
    this.ortho = true;
  }
  showUser() {
    this.noChoice = false;
    this.user = true;
    this.ortho = false;
  }
  showChoice() {
    this.noChoice = true;
    this.user = false;
    this.ortho = false;
  }

}
