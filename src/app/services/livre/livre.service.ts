import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from 'src/app/models/livre/livre.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  constructor(private http: HttpClient) { }

  getAllLivre(): Observable<Livre[]> {
    return this.http.get<Livre[]>(environment.apiUrl + '/livre');
  }

  getLivre(id: String): Observable<Livre> {
    return this.http.get<Livre>(environment.apiUrl + '/livre/' + id);
  }
}
