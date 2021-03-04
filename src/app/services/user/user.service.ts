import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user/user.model';
import { environment, loggedUserKey, tokenKey } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private REST_API_SERVER = environment.apiUrl + "/user/";

  public loggedUser: User;

  constructor(private httpService: HttpClient, private jwtHelper: JwtHelperService) { }

  /*getAllUsers(): Observable<User[]> {
    return this.httpService.get(this.REST_API_SERVER).pipe(
      map((res: User[]) => res));
  }*/

  /*createUser(user: User): Observable<User> {
    return this.httpService.post<User>(this.REST_API_SERVER, user);
  }*/

  updateUser(user: User): Observable<User> {
    return this.httpService.put(this.REST_API_SERVER, user).pipe(
      map((res: User) => res));
  }

  /*deleteUser(id: number): Observable<User> {
    return this.httpService.delete<User>(this.REST_API_SERVER + id);
  }*/

  getUserByEmail(email: string): Observable<User> {
    return this.httpService.get(this.REST_API_SERVER + "?email=" + email).pipe(
      map((res: User) => res));
  }

  isConnected() {
    return this.isTokenAvailable() && this.loggedUser;
  }
  isTokenAvailable() {
    return this.jwtHelper.tokenGetter() && !this.jwtHelper.isTokenExpired(this.jwtHelper.tokenGetter());
  }
  login(email: string, password: string) {
    return this.httpService.post<any>(environment.apiUrl + '/login', { email: email, password: password }).pipe(
      map(response => {
        localStorage.setItem(tokenKey, response.token);
        this.loggedUser = response.user;
      }));
  }
  logout() {
    localStorage.removeItem(tokenKey);
    this.loggedUser = null;
  }
  loadLoggedUser() {
    if (this.isTokenAvailable()) {
      this.httpService.get(this.REST_API_SERVER + "loggedUser").subscribe((user: User) => {
        this.loggedUser = user;
      });
    }
  }
  register(user: User) {
    return this.httpService.post<any>(this.REST_API_SERVER + 'sign-up', user).pipe(
      map(response => {
        localStorage.setItem(tokenKey, response.token);
        this.loggedUser = response.user;
      }));
  }

  // Need backup implementation

  /*
  getUserByLastname(lastname: string): Observable<User> {
      return this.httpService.get(this.REST_API_SERVER + "?lastname=" + lastname).pipe(
          map((res: User) => res));
  }
  
  getUserByFirstname(firstname: string): Observable<User> {
      return this.httpService.get(this.REST_API_SERVER + "?firstname=" + firstname).pipe(
          map((res: User) => res));
  }
  
  getUserByBirthdate(birthdate: string): Observable<User> {
      return this.httpService.get(this.REST_API_SERVER + "?birthdate=" + birthdate).pipe(
          map((res: User) => res));
  }
  
  getUserByLatitude(latitude: number): Observable<User> {
      return this.httpService.get(this.REST_API_SERVER + "?latitude=" + latitude).pipe(
          map((res: User) => res));
  }
  
  getUserByLongitude(longitude: number): Observable<User> {
      return this.httpService.get(this.REST_API_SERVER + "?longitude=" + longitude).pipe(
          map((res: User) => res));
  }
  
  getUserByCity(city: string): Observable<User> {
      return this.httpService.get(this.REST_API_SERVER + "?city=" + city).pipe(
          map((res: User) => res));
  }
  
  getUserByZipcode(zipcode: number): Observable<User> {
      return this.httpService.get(this.REST_API_SERVER + "?zipcode=" + zipcode).pipe(
          map((res: User) => res));
  }
  
  getUserByPassword(password: string): Observable<User> {
      return this.httpService.get(this.REST_API_SERVER + "?password=" + password).pipe(
          map((res: User) => res));
  }
  
  getUserByRole(role: string): Observable<User> {
      return this.httpService.get(this.REST_API_SERVER + "?role=" + role).pipe(
          map((res: User) => res));
  }
  
  getUserByPhoto(photo: any): Observable<User> {
      return this.httpService.get(this.REST_API_SERVER + "?photo=" + photo).pipe(
          map((res: User) => res));
  }
  
  getUserBySpeechtherapist(speechtherapist: any): Observable<User> {
      return this.httpService.get(this.REST_API_SERVER + "?speechtherapist=" + speechtherapist).pipe(
          map((res: User) => res));
  }*/
}
