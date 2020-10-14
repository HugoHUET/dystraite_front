import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitreService {

  private titreSource = new Subject<string>();
  private connectSource = new Subject<boolean>();
  private connected = false;

  titre$ = this.titreSource.asObservable();
  connect$ = this.connectSource.asObservable();

  constructor() { }

  updateTitle(titre: string) {
    this.titreSource.next(titre);
  }

  connect() {
    this.connected = true;
  }
  disconnect() {
    this.connected = false;
  }
  isConnected() {
    return this.connected;
  }
}
