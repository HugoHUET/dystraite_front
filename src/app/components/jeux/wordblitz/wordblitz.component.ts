import { Component, OnInit } from '@angular/core';
import { SortieGameplay } from 'src/app/models/maximots/SortieGameplay/SortieGameplay';
import { MaximotsService } from 'src/app/services/maximots/maximots.service';

@Component({
  selector: 'app-wordblitz',
  templateUrl: './wordblitz.component.html',
  styleUrls: ['./wordblitz.component.css']
})
export class WordblitzComponent implements OnInit {

  isDown: boolean = false;
  grilleElements: HTMLCollectionOf<HTMLDivElement>;
  saisie: HTMLElement;
  win = false;

  constructor(private maximotsService: MaximotsService) { }

  ngOnInit() {
    let grille = document.getElementsByClassName('grille')[0];
    this.maximotsService.getGameData( { categoryIds: [ 1, 2 ] } ).subscribe( (sortieGameplay: SortieGameplay) => {
      grille.setAttribute("style", "grid-template-columns: repeat(10, 1fr);")
      sortieGameplay.grid.forEach( c => {
        let div: HTMLDivElement = document.createElement("div");
        let span: HTMLSpanElement = document.createElement("span");
        span.innerHTML = c.toUpperCase();
        div.appendChild(span);
        grille.appendChild(div);
      })
    })
    this.grilleElements = grille.getElementsByTagName('div');
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

  select(div: HTMLDivElement) {
    div.style.opacity = "0.5";
  }

  clearSelection() {

    this.isDown = false;

    for (let i = 0; i < this.grilleElements.length; i++) {
      const div = this.grilleElements[i];
      div.style.opacity = "1";
    }
  }

}
