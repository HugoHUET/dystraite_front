import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from 'src/app/models/utilisateur/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }
  getUtilisateur(): Observable<Utilisateur[]> {
    console.log(this.http.get<Utilisateur[]>(environment.apiUrl + '/utilisateur'));
    return this.http.get<Utilisateur[]>(environment.apiUrl + '/utilisateur');
  }
}
