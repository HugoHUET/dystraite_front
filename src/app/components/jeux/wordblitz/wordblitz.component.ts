import { Component, OnInit, Renderer2 } from '@angular/core';
import { SortieGameplay } from 'src/app/models/maximots/sortie-gameplay';
import { MaximotsService } from 'src/app/services/maximots/maximots.service';
import { sha256 } from 'js-sha256';
import { MatchWordResult } from 'src/app/models/maximots/match-word-result';

@Component({
	selector: 'app-wordblitz',
	templateUrl: './wordblitz.component.html',
	styleUrls: ['./wordblitz.component.css']
})
export class WordblitzComponent implements OnInit {

	isDown: boolean = false;
	grille: HTMLElement;
	saisie: HTMLElement;
	wordHashArr: string[] = [];
	wordsFindArr: string[] = [];
	win = false;
	theme = "PLAGE";

	constructor(private maximotsService: MaximotsService, private renderer: Renderer2) { }

	ngOnInit() {
		this.loadGrid();
	}

	select(div: HTMLDivElement): void {
		div.style.opacity = "0.5";
	}

	clearSelection(): void {

		this.isDown = false;

		for (let i = 0; i < this.grille.children.length; i++) {
			let div = this.grille.children[i] as HTMLElement;
			div.style.opacity = "1";
		}
	}

	loadGrid() {
		this.saisie = document.getElementById('saisie');
		this.grille = document.getElementById('grille');
		this.saisie.innerHTML = "";
		this.grille.innerHTML = "";
		this.saisie.setAttribute("style", "font-size: 1.6rem; line-height: 200%;")
		this.grille.setAttribute("style", "grid-template-columns: repeat(8, 1fr);")

		this.maximotsService.getGameData({ difficulty: 5 }).subscribe((sortieGameplay: SortieGameplay[]) => {


			sortieGameplay.forEach(sGameplay => {
				console.log(sGameplay.wordsHash);

				this.wordHashArr = sGameplay.wordsHash;

				sGameplay.grid.forEach(c => {

					let div: HTMLDivElement = document.createElement("div");
					div.classList.add("lettre");

					div.addEventListener('pointerdown', (e) => {
						this.isDown = true;
						this.select(div);
						this.saisie.setAttribute("style", "font-size: 3rem; line-height: 110%;")
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

					let span: HTMLSpanElement = document.createElement("span");
					span.innerHTML = c.toUpperCase();

					div.appendChild(span);
					this.grille.appendChild(div);
				})
			});
		});

		['pointerup', 'pointerleave'].forEach(event => {
			document.addEventListener(event, (e) => {
				let mwr = this.checkMatchWord();
				if (mwr == MatchWordResult.FOUND) {
					//word found
					this.isWin();
				} else if (mwr == MatchWordResult.ALREADY_EXIST) {
					//word already exist
				} else {
					//not a match
				}

				this.clearSelection()
			})
		});
	}
	checkMatchWord(): MatchWordResult {
		let saisieHash = sha256.hex(this.saisie.innerHTML)

		if (this.wordHashArr.includes(saisieHash)) {
			if (!this.wordsFindArr.includes(this.saisie.innerHTML)) {
				this.wordsFindArr.push(this.saisie.innerHTML)
				return MatchWordResult.FOUND
			} else {
				return MatchWordResult.ALREADY_EXIST
			}
		} else {
			return MatchWordResult.NOT_FOUND
		}
	}

	isWin(): void {
		if (this.wordsFindArr.length == this.wordHashArr.length) {

			this.win = true;
		}
	}

}
