import { Component, ElementRef, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { SortieGameplay } from 'src/app/models/maximots/sortie-gameplay';
import { MaximotsService } from 'src/app/services/maximots/maximots.service';
import { sha256 } from 'js-sha256';
import { MatchWordResult } from 'src/app/models/maximots/match-word-result';

enum Direction {
	Up = "Up",
	Down = "Down",
	Left = "Left",
	Right = "Right",
	DiagUpLeft = "DiagUpLeft",
	DiagDownLeft = "DiagDownLeft",
	DiagUpRight = "DiagUpRight",
	DiagDownRight = "DiagDownRight",
}
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
	gridSize = 0;

	previousCellNumber: number;
	currentDirection: Direction;

	constructor(private maximotsService: MaximotsService, private renderer: Renderer2, private elementRef: ElementRef) { }

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
	getWordsLeft() {
		return this.wordHashArr.length - this.wordsFindArr.length;
	}
	loadGrid() {
		//A rendre dynamique
		this.gridSize = 8;

		//A changer en fonction de l'image
		this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'rgb(199 199 199 / 12%)';

		this.saisie = document.getElementById('saisie');
		this.grille = document.getElementById('grille');
		this.saisie.innerHTML = this.getWordsLeft() + " mots à trouver !";
		this.grille.innerHTML = "";
		this.saisie.setAttribute("style", "font-size: 1.6rem; line-height: 200%;")
		this.grille.setAttribute("style", "grid-template-columns: repeat(" + this.gridSize + ", 1fr);")

		this.maximotsService.getGameData({ difficulty: 5 }).subscribe((sortieGameplay: SortieGameplay[]) => {


			sortieGameplay.forEach(sGameplay => {
				console.log(sGameplay.wordsHash);

				this.wordHashArr = sGameplay.wordsHash;
				this.saisie.innerHTML = this.getWordsLeft() + " mots à trouver !";

				sGameplay.grid.forEach((c, index) => {

					let div: HTMLDivElement = document.createElement("div");
					div.classList.add("lettre");

					div.addEventListener('pointerdown', (e) => {
						this.previousCellNumber = index;
						this.isDown = true;
						this.currentDirection = null;
						this.select(div);
						this.saisie.setAttribute("style", "font-size: 3rem; line-height: 110%;");
						this.saisie.innerHTML = (e.currentTarget as HTMLElement).innerText;
						if (e.target instanceof HTMLElement) {
							e.target.releasePointerCapture(e.pointerId)
						}
					})

					div.addEventListener('pointerenter', (e: PointerEvent) => {
						//vérifie si la sélection est activée et la lettre n'est pas déjà sélectionnée
						if (this.isDown && div.style.opacity !== "0.5") {
							if (this.currentDirection == null) {
								this.currentDirection = this.getDirection(this.previousCellNumber, index);
								if (!this.currentDirection) {
									console.error("Impossible de déterminer la direction");
								}
								this.previousCellNumber = index;
								this.select(div);
								this.saisie.innerHTML = this.saisie.innerHTML + (e.currentTarget as HTMLElement).innerText;
							} else {
								console.log(this.currentDirection);
								// On vérifie si la direction correspond à la trajectoire prévue
								if (this.checkDirection(index)) {
									this.select(div);
									this.saisie.innerHTML = this.saisie.innerHTML + (e.currentTarget as HTMLElement).innerText;
								}
							}
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

	// Donne la direction en fonction des deux premières cases sélectionées
	getDirection(previousCellNumber: number, currentCellNumber: number): Direction {

		// Différence sur l'axe des x. valeure positive signifie qu'on monte, valeur négative qu'on descend
		let xDiff = this.getPosition(previousCellNumber).x - this.getPosition(currentCellNumber).x;

		// Différence sur l'axe des y. valeure positive signifie qu'on va vers la droite ->, valeur négative qu'on reviens vers la gauche <-
		let yDiff = this.getPosition(currentCellNumber).y - this.getPosition(previousCellNumber).y;

		/*console.log(xDiff)
		console.log(yDiff)*/

		switch (xDiff) {
			case 0:
				if (yDiff > 0) {
					return Direction.Right
				}
				if (yDiff < 0) {
					return Direction.Left
				}
				break;
			case 1:
				switch (yDiff) {
					case 0:
						return Direction.Up
						break;
					case 1:
						return Direction.DiagUpRight
						break;
					case -1:
						return Direction.DiagUpLeft
						break;
					default:
						break;
				}
				break;
			case -1:
				switch (yDiff) {
					case 0:
						return Direction.Down
						break;
					case 1:
						return Direction.DiagDownRight
						break;
					case -1:
						return Direction.DiagDownLeft
						break;
					default:
						break;
				}
				break;
			default:
				break;
		}

	}
	checkDirection(currentCellNumber: number): Boolean {
		/*console.log(this.previousCellNumber)
		console.log(currentCellNumber);
		console.log(this.getDirection(this.previousCellNumber, currentCellNumber));*/

		if (this.getDirection(this.previousCellNumber, currentCellNumber) === this.currentDirection) {
			this.previousCellNumber = currentCellNumber;
			return true;
		}
		return false;
	}
	getPosition(cellNumber: number) {
		//numéro de ligne
		let x = Math.floor(cellNumber / this.gridSize);

		//numéro de colonne
		let y = cellNumber % this.gridSize;

		return {
			x: x,
			y: y
		}
	}

}
