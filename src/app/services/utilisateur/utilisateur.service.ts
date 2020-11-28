import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, tokenKey } from 'src/environments/environment';
import { Utilisateur } from 'src/app/models/utilisateur/utilisateur.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {


  constructor(private http: HttpClient, private route: Router) { }
  getUtilisateur(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(environment.apiUrl + '/utilisateur');
  }
  isConnected() {
    const helper = new JwtHelperService();
    if (!helper.tokenGetter() && helper.isTokenExpired(helper.tokenGetter())) {
      return false;
    }
    return true;
  }
  connect(login: string, password: string, redirectUrl: any[]) {
    const credentials = {
      login,
      password
    };
    this.http.post<any>(environment.apiUrl + '/login', credentials).subscribe(result => {
      localStorage.setItem(tokenKey, result.token);
      this.route.navigate(redirectUrl);
    });
  }
  disconnect() {
    localStorage.setItem(tokenKey, null);
  }
}
