import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tips } from 'src/app/models/tips/tips';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipsService {

  private REST_API_SERVER = environment.apiUrl + '/tips/';

  constructor(private httpService: HttpClient) { }

  getAll(): Observable<Tips[]> {
    return this.httpService.get(this.REST_API_SERVER).pipe(
      map((res: Tips[]) => res.reverse()));
  }

  create(tip): Observable<Tips> {
    return this.httpService.post<any>(this.REST_API_SERVER, tip).pipe(
      map((res: Tips) => res));;
  }

  update(value: Tips) {
    return this.httpService.put(this.REST_API_SERVER, value);
  }

  delete(id: number): Observable<Tips> {
    return this.httpService.delete<Tips>(this.REST_API_SERVER + id);
  }

  getById(id: number): Observable<Tips> {
    return this.httpService.get(this.REST_API_SERVER + id).pipe(
      map((res: Tips) => res));
  }
  getLast(limit: number): Observable<Tips[]> {
    return this.httpService.get(this.REST_API_SERVER + "/getLast/" + limit).pipe(
      map((res: Tips[]) => res));
  }
  like(tip: Tips): Observable<Tips> {
    return this.httpService.post<Tips>(this.REST_API_SERVER + 'like', tip);
  }

}
