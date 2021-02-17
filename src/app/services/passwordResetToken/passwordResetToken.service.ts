import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

class RequestTokenClass {
  email: string
}
@Injectable({
  providedIn: 'root'
})
export class PasswordResetTokenService {

  private REST_API_SERVER = environment.apiUrl + '/users';

  constructor(private httpService: HttpClient) { }

  requestToken(email: string) {
    const url = `${this.REST_API_SERVER}/request-token`;
    console.log(url);
    const body: RequestTokenClass = { email };
    return this.httpService.post<RequestTokenClass>(url, body);
  }

}
