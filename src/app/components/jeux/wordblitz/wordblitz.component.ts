import { Component, ElementRef, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { SortieGetGrid } from 'src/app/models/maximots/sortie-get-grid';
import { MaximotsService } from 'src/app/services/maximots/maximots.service';
import { sha256 } from 'js-sha256';
import { MatchWordResult } from 'src/app/models/maximots/match-word-result';
import { SortieVerifyResponse } from 'src/app/models/maximots/sortie-verify-response';

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
	theme = "";
	difficulty = 5;
	gridId = undefined;

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
	updateProgressBar() {
		document.getElementById('progress-bar').setAttribute("style", "width:" + Math.round(100 - (this.getWordsLeft() / this.wordHashArr.length) * 100) + "%;");
	}
	loadGrid() {
		//A changer en fonction de l'image
		this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'rgb(199 199 199 / 12%)';

		this.saisie = document.getElementById('saisie');
		this.grille = document.getElementById('grille');
		this.grille.innerHTML = "";
		this.grille.setAttribute("style", "grid-template-columns: repeat(" + this.difficulty + ", 1fr);")

		this.maximotsService.getGameData({ difficulty: this.difficulty }).subscribe((sGameplay: SortieGetGrid) => {
			this.displayNewGrid(sGameplay);
		});

		['pointerup', 'pointerleave'].forEach(event => {
			document.addEventListener(event, (e) => {
				let mwr = this.checkMatchWord();
				this.applyEffect(mwr);
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
	displayNewGrid(sGameplay: SortieGetGrid){
		this.theme = sGameplay.gridLabel;
		this.wordHashArr = sGameplay.wordsHash;
		this.gridId = sGameplay.gridId;
		this.setText(this.getWordsLeft() + " mots à trouver !");
		this.grille.innerHTML = "";
		this.wordsFindArr = [];
		this.updateProgressBar();

		sGameplay.grid.forEach((c, index) => {

			let div: HTMLDivElement = document.createElement("div");
			div.classList.add("lettre");

			div.addEventListener('pointerdown', (e) => {
				this.previousCellNumber = index;
				this.isDown = true;
				this.currentDirection = null;
				this.select(div);
				//this.clearAnimations();
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
	}
	checkMatchWord(): MatchWordResult {
		let word = this.saisie.innerHTML.replace(/(\r\n|\n|\r)/gm, "");
		if (word.length < 2 || !this.isDown) {
			return null;
		}
		let saisieHash = sha256.hex(word)

		if (this.wordHashArr.includes(saisieHash)) {
			if (!this.wordsFindArr.includes(word)) {
				this.wordsFindArr.push(word)
				this.updateProgressBar();
				return MatchWordResult.FOUND
			} else {
				return MatchWordResult.ALREADY_EXIST
			}
		} else {
			return MatchWordResult.NOT_FOUND
		}
	}
	setText(content: string) {
		this.saisie.setAttribute("style", "font-size: 1.6rem; line-height: 200%;")
		this.saisie.innerHTML = content;
	}
	nextGrid(){
		this.loadGrid();
		this.win = false;
	}
	isWin(): void {
		if (this.wordsFindArr.length == this.wordHashArr.length) {
			this.maximotsService.verifyResponse({words: this.wordsFindArr, gridId: this.gridId}).subscribe((sortieVerifyResponse: SortieVerifyResponse) => {
				if (sortieVerifyResponse.finish) {
					this.win = true;
				}else{
					this.displayNewGrid(sortieVerifyResponse.sortieGetGrid);
				}
			});
		}
	}

	applyEffect(matchWordResult: MatchWordResult) {
		if (matchWordResult == MatchWordResult.FOUND) {
			this.saisie.classList.add('word-correct');
		}
		if (matchWordResult == MatchWordResult.NOT_FOUND) {
			this.saisie.classList.add('word-incorrect');
		}
		this.saisie.addEventListener('animationend', () => {
			this.saisie.classList.remove("word-correct", "word-incorrect");
			this.motivatingMessages(matchWordResult, this.saisie);
		});
	}
	motivatingMessages(matchWordResult: MatchWordResult, saisie: HTMLElement) {
		if (matchWordResult == MatchWordResult.FOUND) {
			if (this.getWordsLeft() < 2) {
				this.setText("Courage, plus qu'" + this.getWordsLeft() + " mot à trouver !");
			} else {
				this.setText("");
			}
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
		let x = Math.floor(cellNumber / this.difficulty);

		//numéro de colonne
		let y = cellNumber % this.difficulty;

		return {
			x: x,
			y: y
		}
	}

}
