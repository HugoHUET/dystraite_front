import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitreService {

  private titreSource = new Subject<string>();
  private connectSource = new Subject<boolean>();

  titre$ = this.titreSource.asObservable();
  connect$ = this.connectSource.asObservable();

  constructor() { }

  updateTitle(titre: string) {
    this.titreSource.next(titre);
  }

  updateConnect(c: boolean) {
    this.connectSource.next(c);
  }
}
