import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SortieGameplay } from 'src/app/models/maximots/SortieGameplay/SortieGameplay';
import { EntreeGameplay } from 'src/app/models/maximots/entree-gameplay';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaximotsService {

  private REST_API_SERVER = environment.apiUrl + '/maximots/gameplay/';

  constructor(private httpService: HttpClient) { }

  getGameData(entreeGameplay: EntreeGameplay): Observable<SortieGameplay> {
    return this.httpService.post<SortieGameplay>(this.REST_API_SERVER, entreeGameplay.categoryIds);
  }
}
