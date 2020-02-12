import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { Cours } from 'src/app/models/cours/cours.model';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(private http: HttpClient) { }

  localhost = 'http://localhost:7050';

  getCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(this.localhost + '/cours');
    // return this.http.get<Livre[]>(this.localhost + '/livre/get');
  }
}
