import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitreService {

  private titreSource = new Subject<string>();

  titre$ = this.titreSource.asObservable();

  constructor() { }

  updateTitle(titre: string) {
    this.titreSource.next(titre);
  }
}
