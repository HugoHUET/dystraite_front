import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetTokenService {

  private REST_API_SERVER = environment.apiUrl + '/users';

  constructor(private httpService: HttpClient) { }

  requestToken(email: string) {
    const url = `${this.REST_API_SERVER}/request-token`;
    const body = { email };
    return this.httpService.post(url, body);
  }

  changePassword(token: string, email: string, password: string) {
    const url = `${this.REST_API_SERVER}/change-password/${token}`;
    const body = { email, password };
    return this.httpService.post(url, body);
  }

}
