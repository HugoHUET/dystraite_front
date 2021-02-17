import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wordblitz',
  templateUrl: './wordblitz.component.html',
  styleUrls: ['./wordblitz.component.css']
})
export class WordblitzComponent implements OnInit {

  isDown: boolean = false;
  grilleElements: HTMLCollectionOf<HTMLDivElement>;
  saisie: HTMLElement;

  constructor() { }

  ngOnInit() {
    let grille = document.getElementsByClassName('grille')[0];
    this.grilleElements = document.getElementsByClassName('grille')[0].getElementsByTagName('div');
    this.saisie = document.getElementById('saisie');

    document.addEventListener('pointerup', (e) => {

      this.clearSelection()
      
    })

    grille.addEventListener('pointerleave', (e) => {

      this.clearSelection()
      
    })

    for (let i = 0; i < this.grilleElements.length; i++) {
      const div = this.grilleElements[i];

      div.addEventListener('pointerdown', (e) => {
        this.isDown = true;
        this.select(div);
        this.saisie.innerHTML = e["path"][0].innerText;
        if (e.target instanceof HTMLElement) {
          e.target.releasePointerCapture(e.pointerId)
        }
      })

      div.addEventListener('pointerenter', (e: PointerEvent) => {
        //vérifie si la séléction est activée et la lettre n'est pas déjà sélectionnée
        if (this.isDown && div.style.opacity !== "0.5") {
          this.select(div);
          
          this.saisie.innerHTML = this.saisie.innerHTML + e["path"][0].innerText;
          
        }
      })
    }
  }

  select(div: HTMLDivElement){
    div.style.opacity = "0.5";
  }

  clearSelection(){

    this.isDown = false;

    for (let i = 0; i < this.grilleElements.length; i++) {
      const div = this.grilleElements[i];
      div.style.opacity = "1";
    }
  }

}
