import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SortieGetGrid } from 'src/app/models/maximots/sortie-get-grid';
import { EntreeGetGrid } from 'src/app/models/maximots/entree-get-grid';
import { environment } from 'src/environments/environment';
import { EntreeVerifyResponse } from 'src/app/models/maximots/entree-verify-response';
import { SortieVerifyResponse } from 'src/app/models/maximots/sortie-verify-response';

@Injectable({
  providedIn: 'root'
})
export class MaximotsService {

  private REST_API_SERVER = environment.apiUrl + '/maximots/gameplay/';

  constructor(private httpService: HttpClient) { }

  getGameData(): Observable<SortieGetGrid> {
    return this.httpService.get<SortieGetGrid>(this.REST_API_SERVER + "getGrid");
  }

  verifyResponse(entreeVerifyResponse: EntreeVerifyResponse): Observable<SortieVerifyResponse>{
    return this.httpService.post<SortieVerifyResponse>(this.REST_API_SERVER + "verifyResponse", entreeVerifyResponse);
  }
}
